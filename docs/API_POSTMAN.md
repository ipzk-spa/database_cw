# Опис API (Postman) — 2 endpoint

## Alcohol Store REST API


| Реквізит             | Значення                                            |
| -------------------- | --------------------------------------------------- |
| **Базовий URL**      | `http://localhost:4000`                             |
| **Колекція Postman** | `postman/AlcoholStore_DOCS.postman_collection.json` |
| **Проєкт**           | Alcohol Store (навчальний вебкомплекс)              |


Перед тестуванням запустіть проєкт: `docker compose up --build`, потім `docker exec alcohol-store-backend npm run seed`.

---

## Endpoint 1 — Авторизація користувача

### `POST /auth/login`


| Параметр         | Значення                           |
| ---------------- | ---------------------------------- |
| **Метод**        | POST                               |
| **URL**          | `http://localhost:4000/auth/login` |
| **Auth**         | Не потрібна                        |
| **Content-Type** | `application/json`                 |


#### Призначення (бізнес)

Дозволяє зареєстрованому клієнту увійти в систему та отримати JWT-токен для оформлення замовлення та перегляду профілю.

#### Тіло запиту (Request Body)

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```


| Поле       | Тип    | Обов'язкове | Опис                                                                 |
| ---------- | ------ | ----------- | -------------------------------------------------------------------- |
| `email`    | string | Так         | Email, вказаний при реєстрації                                       |
| `password` | string | Так         | Пароль у відкритому вигляді (на сервері порівнюється з bcrypt-хешем) |


#### Успішна відповідь `200 OK`

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "email": "user@example.com",
  "userId": 1
}
```


| Поле          | Опис                                                       |
| ------------- | ---------------------------------------------------------- |
| `accessToken` | JWT для заголовка `Authorization: Bearer ...`              |
| `email`       | Email користувача                                          |
| `userId`      | Ідентифікатор для `POST /orders` та `GET /orders/user/:id` |


#### Помилки


| Код | Ситуація                  |
| --- | ------------------------- |
| 401 | Невірний email або пароль |
| 400 | Невалідне тіло запиту     |


#### Приклад у Postman

1. Method: **POST**
2. URL: `{{baseUrl}}/auth/login`
3. Body → **raw** → **JSON** — тіло вище
4. Зберегти `accessToken` у змінну середовища `token` (Tests → `pm.environment.set("token", pm.response.json().accessToken)`)

#### Зв'язок з BRD / SSD

- **BR-08** (Авторизація), **BRU-01** (замовлення лише після входу)
- Модуль **M2** (`auth`), **F2** у SSD

---

## Endpoint 2 — Фільтрація каталогу

### `GET /alcohol/filter`


| Параметр             | Значення                               |
| -------------------- | -------------------------------------- |
| **Метод**            | GET                                    |
| **URL**              | `http://localhost:4000/alcohol/filter` |
| **Auth**             | Не потрібна                            |
| **Query parameters** | Усі необов'язкові                      |


#### Призначення (бізнес)

Повертає список напоїв за критеріями каталогу (тип, країна, об'єм, міцність, бренд тощо). Використовується на сторінці «Каталог» інтернет-магазину.

#### Приклад URL

```
http://localhost:4000/alcohol/filter?type_alcohol=Vodka&countries=Ukraine&volume=0.5&brand=Nemiroff
```

#### Query-параметри


| Параметр       | Тип     | Приклад   | Опис                                      |
| -------------- | ------- | --------- | ----------------------------------------- |
| `type_alcohol` | string  | `Vodka`   | Тип напою (можна передати кілька разів)   |
| `countries`    | string  | `Ukraine` | Країна виробництва                        |
| `volume`       | number  | `0.5`     | Об'єм, л (у seed: Nemiroff De Luxe — 0.5) |
| `durability`   | number  | `40`      | Міцність, %                               |
| `brand`        | string  | `Jameson` | Пошук за підрядком у назві бренду (ILIKE) |
| `availability` | boolean | `true`    | Наявність                                 |
| `cost`         | number  | `500`     | Ціна                                      |


**Допустимі значення `type_alcohol`:**  
`Whiskey`, `Brandy`, `Vodka`, `Rum`, `Tequila`, `Wines`, `Gin`, `Liquor`, `Beer`

#### Успішна відповідь `200 OK`

Масив об'єктів товару, наприклад:

```json
[
  {
    "id": 11,
    "item_code": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "brand": "Nemiroff De Luxe",
    "countries": "Ukraine",
    "type_alcohol": "Vodka",
    "volume": "0.50",
    "durability": "40.00",
    "availability": true,
    "cost": "320.00",
    "description": "Українська горілка...",
    "file": "uploads/nemiroff-de-luxe.jpg"
  }
]
```

#### Помилки


| Код | Ситуація                                                      |
| --- | ------------------------------------------------------------- |
| 404 | За заданими критеріями нічого не знайдено (NotFoundException) |


#### Приклад у Postman

1. Method: **GET**
2. URL: `{{baseUrl}}/alcohol/filter`
3. Вкладка **Params**: додати `type_alcohol` = `Vodka`, `countries` = `Ukraine`
4. Натиснути **Send**

#### Зв'язок з BRD / SSD

- **BR-01**, **BR-02**, **BR-04** (каталог, фільтри, пошук)
- Модуль **M1** (`alcohol`), **F1** у SSD

---

## Змінні середовища Postman


| Змінна    | Значення                   |
| --------- | -------------------------- |
| `baseUrl` | `http://localhost:4000`    |
| `token`   | (заповнюється після login) |


---

## Порядок перевірки в Postman

1. Імпортувати колекцію `postman/AlcoholStore_DOCS.postman_collection.json`.
2. Створити Environment з `baseUrl`.
3. (Опційно) `POST /users` — реєстрація тестового користувача.
4. **Endpoint 1:** `POST /auth/login` → зберегти `token`.
5. **Endpoint 2:** `GET /alcohol/filter` — перевірити список товарів.

---

*Кінець документа.*