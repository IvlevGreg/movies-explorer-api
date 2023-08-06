# movies-explorer-api

## деплой: http://api.greg.nomoreparties.co/

## Стек:
- ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

- ![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![supertest](https://img.shields.io/badge/-supertest-000000?style=for-the-badge&logo=tistory&logoColor=058a5e)
![mongodb-memory-server](https://img.shields.io/badge/mongodb_memory_server-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

- ![helmet](https://img.shields.io/badge/helmet-0F1689?style=for-the-badge&logo=helm&logoColor=058a5e)
![bcrypt](https://img.shields.io/badge/bcrypt-003A70?style=for-the-badge&logo=letsencrypt&logoColor=058a5e)
![express-brute](https://img.shields.io/badge/express_brute-7957D5?style=for-the-badge&logo=buefy&logoColor=058a5e)
![winston](https://img.shields.io/badge/winston-000000?style=for-the-badge&logo=wire&logoColor=058a5e)
![joi](https://img.shields.io/badge/joi-004027?style=for-the-badge&logo=jameson&logoColor=058a5e)
![cors](https://img.shields.io/badge/cors-003A70?style=for-the-badge&logo=cors&logoColor=058a5e)

- ![mongoDB](https://img.shields.io/badge/mongodb-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)

- ![ESlint](https://img.shields.io/badge/eslint-4B32C3.svg?style=for-the-badge&logo=eslint&logoColor=white)

## О проекте:
- Реализована авторизация и аутентификация пользователей
- Настроено логгирование (запросы и ответы записываются в request.log, ошибки записываются в error.log)
- Ошибки обрабатываются централизованным обработчиком
- Для тестов используется jest в связке с supertest, superagent и mongodb-memory-server
- Данные валидируются перед добавлением в базу

## Безопасность:
- Хранение пароля реализовано "бережно" (пароль хранится в виде хеша, API не возвращает хеш пароля клиенту)
- Для установки заголовков связанных с безопасностью используется модуль Helmet
- Внедрен express-brute для ограничения числа запросов с одного IP в единицу времени
- Реализована защита от CSRF
- Содержимое запросов контролируется средствами валидации joi, когда запрос выглядит не так, как ожидается, его обработка прекращается
- Размер тел входящих запросов ограничен 50кб
- Все роуты, кроме аутентификации и авторизации, защищены авторизацией.
- CORS. Кросс-доменные запросы ограничены белым листом адресов

## Роуты:

```bash
# возвращает информацию о пользователе (email и имя)
GET /users/me

# обновляет информацию о пользователе (email и имя)
PATCH /users/me

# возвращает все сохранённые текущим пользователем фильмы
GET /movies

# создаёт фильм с переданными в теле
# country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId 
POST /movies

# удаляет сохранённый фильм по id
DELETE /movies/_id

# создаёт пользователя с переданными в теле email, password и name
POST /signup

# проверяет переданные в теле почту и пароль и возвращает JWT
POST /signin 
```

## Get started:

In the project directory, you can run:

### `npm i`

Installs command a package and any packages that it depends on.

### `npm start`

Runs the app in the development mode.

### `npm run dev`

The server will reload if you make edits.
You will also see any lint errors in the console.

### `brew services start mongodb-community@4.4` 

start mongoDB (works for Mac & brew)
