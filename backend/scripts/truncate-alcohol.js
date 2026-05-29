const { join } = require('path');
const { Client } = require('pg');
require('dotenv').config({ path: join(__dirname, '..', '.env') });

(async () => {
  const client = new Client({
    host: process.env.POSTGRES_HOST || 'localhost',
    port: Number(process.env.POSTGRES_PORT || 5432),
    database: process.env.POSTGRES_DATABASE,
    user: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
  });
  await client.connect();
  await client.query('TRUNCATE TABLE "orderItems", alcohol RESTART IDENTITY CASCADE');
  await client.end();
  console.log('Таблицю alcohol очищено.');
})();
