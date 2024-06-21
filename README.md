# Cервис "Поставок"

## Списком поставок, с возможностью поиска, редактирования, удаления и добавления поставки

## Технологии:

React, Typescript, Redux RTK, CRA, date-fns, react-datepicker, react-paginate

## Для запуска:

1. Перейдите в директорию `mock-server`:

   ```s
   cd mock-server
   ```

2. Установите зависимости:

   ```sh
   npm install
   ```

3. Вернитесь в корневую директорию `WB-Ermolenko.Christina-Suppliers`:

   ```sh
   cd ..
   ```

4. Установите зависимости:

   ```sh
   npm install
   ```

5. Запустите сервер:

   ```sh
   npm run start:server
   ```

   Сервер запускается по адресу `http://localhost:5001`.

   Данные доступны по адресам:

   - http://localhost:5001/api/supplies
   - http://localhost:5001/api/cities
   - http://localhost:5001/api/statuses
   - http://localhost:5001/api/supplyTypes
   - http://localhost:5001/api/warehouses

6. Откройте второй терминал и запустите приложение:

   ```sh
   npm run start
   ```

   Приложение будет запущено по адресу `http://localhost:3000`.

После запуска серверной и фронтенд частей, откройте браузер по адресу `http://localhost:5001`и `http://localhost:3000` для использования приложения.
