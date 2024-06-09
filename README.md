# Project "Book Store"

Этот проект представляет собой веб-сайт для продажи книг.

## **Особенности**

- Регистрация и аутентификация пользователей
- Просмотр каталога книг
- Добавление книг в корзину
- Оформление заказов
- Просмотр истории заказов
- Управление книгами для администратора

## Установка

1. Клонируйте репозиторий: `git clone <your-repository-url>`
2. Установите зависимости: `npm install`
3. Создайте новый файл `.env` и добавьте следующие строки:
    ```
    PORT="YOUR_PORT"
    DB_URL="YOUR_DB_URL_CONNECT"
    JWT_SECRET="YOUR_JWT_SECRET_KEY"
    ```

## Использование

1. Запустите сервер: `npm run start:dev`
2. Откройте веб-сайт в браузере: `http://localhost:PORT`

## Технологии

- Node.js
- Express.js
- MongoDB
- TypeScript
- jsonwebtoken: для создания и проверки JWT токенов.
- mongoose: для работы с MongoDB.
- prettier: для форматирования кода.

## Автор

**Beyelon** - beyelon@gmail.com
