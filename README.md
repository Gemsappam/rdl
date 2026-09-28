# Rosa di Luna — главная страница

Статичный сайт (HTML/CSS/JS), без сборки.

## Деплой на Vercel
- Перетащите папку на vercel.com/new (или `npx vercel --prod` в этой папке).
- Framework preset: **Other**. Build command: пусто. Output directory: `.`

## Структура
- `index.html` — разметка
- `assets/css/style.css` — стили (desktop 1440 по макету + адаптив до 360px)
- `assets/js/main.js` — карточки товаров, корзина-счётчик, избранное, меню, форма рассылки
- `assets/img/` — фото и графика, вырезанные из макета

## Шрифты
Google Fonts: Onest (заголовки, `--display`), Montserrat (текст, `--sans`), Cousine (моно-подписи, `--mono`).
Переменные — в начале style.css.
