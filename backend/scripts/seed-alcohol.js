/**
 * Заповнення таблиці alcohol тестовими напоями.
 * Запуск: npm run seed (з папки backend, коли PostgreSQL доступна)
 */
const { randomUUID } = require('crypto');
const { readFileSync } = require('fs');
const { join } = require('path');
const { Client } = require('pg');
require('dotenv').config({ path: join(__dirname, '..', '.env') });

async function seed() {
  const samplePath = join(__dirname, '..', 'data', 'sample-alcohol.json');
  const items = JSON.parse(readFileSync(samplePath, 'utf8'));

  const client = new Client({
    host: process.env.POSTGRES_HOST || 'localhost',
    port: Number(process.env.POSTGRES_PORT || 5432),
    database: process.env.POSTGRES_DATABASE,
    user: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
  });

  await client.connect();

  await client.query(`
    ALTER TABLE alcohol
    ALTER COLUMN brand TYPE varchar(100)
  `).catch(() => {});

  const countResult = await client.query('SELECT COUNT(*)::int AS count FROM alcohol');
  const existing = countResult.rows[0].count;

  if (existing > 0) {
    console.log(
      `У базі вже є ${existing} напоїв. Пропускаємо seed (видаліть записи вручну, якщо потрібно заново).`,
    );
    await client.end();
    return;
  }

  const insertSql = `
    INSERT INTO alcohol (
      item_code, brand, countries, type_alcohol, volume,
      durability, availability, cost, description, file
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
  `;

  for (const item of items) {
    await client.query(insertSql, [
      randomUUID(),
      item.brand,
      item.countries,
      item.type_alcohol,
      item.volume,
      item.durability,
      item.availability ?? true,
      item.cost,
      item.description,
      item.file,
    ]);
    console.log(`Додано: ${item.brand} (${item.type_alcohol})`);
  }

  console.log(`\nГотово! Додано ${items.length} напоїв.`);
  await client.end();
}

seed().catch((err) => {
  console.error('Помилка seed:', err.message);
  process.exit(1);
});
