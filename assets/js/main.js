(function(){
  var products=[
    {img:'p1',alt:'Букет оранжевых тюльпанов'},{img:'p2',alt:'Букет жёлтых кустовых роз'},
    {img:'p3',alt:'Букет розовых лилий'},{img:'p4',alt:'Розовые пионы'},{img:'p5',alt:'Букет красных пионовидных роз'},
    {img:'p6',alt:'Букет сиреневых роз'},{img:'p7',alt:'Букет белых эустом'},{img:'p8',alt:'Букет альстромерий'},
    'banner',
    {img:'p9',alt:'Розовые тюльпаны'},{img:'p10',alt:'Букет красных роз в крафте'},{img:'p11',alt:'Большой букет кремовых роз'},
    {img:'p12',alt:'Букет розовых роз в конусе'},{img:'p13',alt:'Букет розово-зелёных роз'}
  ];
  var cart={}, favs={};
  cart['p2']=1; // matches the mockup's active state
  var grid=document.querySelector('[data-products]');
  var heartSvg='<svg viewBox="0 0 24 24"><path d="M12 20.5s-8-5-8-10.8C4 6.8 6.1 4.5 8.8 4.5c1.5 0 2.6.7 3.2 1.8.6-1.1 1.7-1.8 3.2-1.8 2.7 0 4.8 2.3 4.8 5.2 0 5.8-8 10.8-8 10.8z"/></svg>';
  function controls(id){
    var q=cart[id]||0;
    return q>0
      ? '<div class="qty"><button data-dec="'+id+'" aria-label="Убрать одну">−</button><span>'+q+'</span><button data-inc="'+id+'" aria-label="Добавить ещё">+</button></div>'
      : '<button class="cart-btn" data-inc="'+id+'">добавить в корзину</button>';
  }
  function render(){
    grid.innerHTML=products.map(function(p){
      if(p==='banner') return '<div class="banner"><span class="bowls" aria-hidden="true"><i></i><i></i></span><h2>Цветы<br>и подарки 24/7</h2><p>Подготовим, сфотографируем и привезём.<br>В пару кликов, в удобное время.</p></div>';
      return '<article class="card"><div class="card-media"><img src="assets/img/'+p.img+'.jpg" alt="'+p.alt+'" loading="lazy">'+
        '<button class="heart" data-fav="'+p.img+'" aria-label="В избранное" aria-pressed="'+(!!favs[p.img])+'">'+heartSvg+'</button></div>'+
        '<p class="price">от 4 999 ₽</p><p class="split">x4 платежа по 1 225 ₽</p>'+
        '<h3 class="card-title">Букет из 21 герберы микс в розовой упаковке</h3>'+
        '<div data-ctl="'+p.img+'">'+controls(p.img)+'</div></article>';
    }).join('');
  }
  function updateBadge(){
    var n=Object.keys(cart).reduce(function(s,k){return s+cart[k]},0);
    var b=document.querySelector('[data-cart-count]');
    b.textContent=n; if(n) b.removeAttribute('data-empty'); else b.setAttribute('data-empty','');
  }
  function refresh(id){ var el=grid.querySelector('[data-ctl="'+id+'"]'); if(el) el.innerHTML=controls(id); updateBadge(); }
  grid.addEventListener('click',function(e){
    var t=e.target.closest('button'); if(!t) return;
    if(t.dataset.inc){cart[t.dataset.inc]=(cart[t.dataset.inc]||0)+1;refresh(t.dataset.inc)}
    else if(t.dataset.dec){var id=t.dataset.dec;cart[id]=Math.max(0,(cart[id]||0)-1);if(!cart[id])delete cart[id];refresh(id)}
    else if(t.dataset.fav){var f=t.dataset.fav;favs[f]=!favs[f];t.setAttribute('aria-pressed',favs[f])}
  });
  render(); updateBadge();

  var menu=document.querySelector('[data-menu]');
  document.querySelector('[data-open-menu]').addEventListener('click',function(){menu.hidden=false});
  menu.addEventListener('click',function(e){ if(e.target===menu||e.target.closest('[data-close-menu]')||e.target.closest('a')) menu.hidden=true; });
  document.addEventListener('keydown',function(e){ if(e.key==='Escape') menu.hidden=true; });

  var form=document.querySelector('[data-newsletter]'), msg=document.querySelector('[data-nl-msg]');
  form.addEventListener('submit',function(e){
    e.preventDefault();
    var v=form.email.value.trim();
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)){msg.textContent='Введите email в формате name@mail.ru';msg.style.color='#e42920';return}
    msg.style.color='';msg.textContent='Готово — вы подписаны на рассылку.';form.reset();
  });
})();
