const fs = require("fs");
const { join } = require("path");

const samplePath = join(__dirname, "..", "data", "sample-alcohol.json");
const outPath = join(__dirname, "..", "data", "PRODUCTS_PHOTO_LIST.txt");
const items = JSON.parse(fs.readFileSync(samplePath, "utf8"));

const typeUa = {
  Whiskey: "Віскі",
  Brandy: "Бренді",
  Vodka: "Горілка",
  Rum: "Ром",
  Tequila: "Текіла",
  Wines: "Вино",
  Gin: "Джин",
  Liquor: "Лікер",
  Beer: "Пиво",
};

const lines = [
  "ALCOHOL STORE — перелік продуктів для пошуку фото",
  "Джерело: backend/data/sample-alcohol.json",
  "Куди класти фото: backend/uploads/ (ім'я — як у колонці «Файл»)",
  "Заглушка без фото: frontend/public/img/web-pack/{тип}-with-bg.jpg",
  "=".repeat(90),
  "",
];

items.forEach((item, index) => {
  const vol = String(item.volume).replace(".", ",");
  const fileName = item.file.replace(/^uploads\//, "");
  lines.push(
    `${String(index + 1).padStart(2, "0")}. ${item.brand}`,
    `    Тип: ${typeUa[item.type_alcohol] || item.type_alcohol} (${item.type_alcohol})`,
    `    Країна: ${item.countries}`,
    `    Об'єм: ${vol} л | Міцність: ${item.durability}% | Ціна: ${item.cost} грн`,
    `    Файл: ${item.file}`,
    `    Шукати в Google: "${item.brand}" ${item.type_alcohol} bottle ${fileName}`,
    ""
  );
});

lines.push(`Всього продуктів: ${items.length}`);
fs.writeFileSync(outPath, lines.join("\r\n"), "utf8");
console.log(`Written ${items.length} products to ${outPath}`);
