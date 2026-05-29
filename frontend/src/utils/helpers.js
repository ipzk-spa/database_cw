const TYPE_ALCOHOL_UA = {
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

/** Назва типу українською */
export function getTypeAlcoholLabel(type) {
  return TYPE_ALCOHOL_UA[type] || type || "";
}

/** 0.7 → "0,70" */
export function formatVolume(volume) {
  const n = Number(volume);
  if (Number.isNaN(n)) return volume;
  return n.toFixed(2).replace(".", ",");
}

/** 40 → "40%" */
export function formatDurability(durability) {
  const n = Number(durability);
  if (Number.isNaN(n)) return durability;
  const rounded = Math.round(n * 10) / 10;
  const text =
    rounded % 1 === 0
      ? String(Math.round(rounded))
      : rounded.toFixed(1).replace(".", ",");
  return `${text}%`;
}

/** "Absolut Citron" → "Absolut - Citron"; одне слово без змін */
export function formatBrandName(brand) {
  if (!brand) return "";
  const words = brand.trim().split(/\s+/);
  if (words.length <= 1) return brand;
  return `${words[0]} - ${words.slice(1).join(" ")}`;
}

/**
 * Повна назва товару, напр.:
 * "Горілка Absolut - Citron 0,70 л 40%"
 */
export function formatProductTitle(item) {
  if (!item) return "";
  const type = getTypeAlcoholLabel(item.type_alcohol);
  const brand = formatBrandName(item.brand);
  const volume = formatVolume(item.volume);
  const strength = formatDurability(item.durability);
  return `${type} ${brand} ${volume} л ${strength}`;
}

/** Токен з cookie */
export function getAuthToken() {
  const row = document.cookie
    .split("; ")
    .find((c) => c.startsWith("token="));
  return row ? row.split("=")[1] : null;
}

export function getAuthHeaders() {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/** Фото товару: uploads з API або заглушка за типом */
export function getProductImageUrl(item) {
  if (!item) return "/img/web-pack/beer-with-bg.jpg";
  if (item.file) {
    const name = item.file.replace(/^uploads\//, "").replace(/^\//, "");
    return `/uploads/${name}`;
  }
  const type = (item.type_alcohol || "beer").toLowerCase();
  return `/img/web-pack/${type}-with-bg.jpg`;
}

export function formatOrderDate(isoOrDate) {
  const d = new Date(isoOrDate);
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${hours}:${minutes} ${day}.${month}.${year}`;
}

export function addToCart(item, quantity = 1) {
  const stored = localStorage.getItem("cart");
  const cart = stored ? JSON.parse(stored) : [];
  const found = cart.find((p) => p.id === item.id);
  if (found) {
    found.quantity = (found.quantity || 1) + quantity;
  } else {
    cart.push({ ...item, quantity });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  window.dispatchEvent(new Event("cart-updated"));
  return cart;
}
