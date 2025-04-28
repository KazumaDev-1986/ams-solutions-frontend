export const API_BASE_URL =
  import.meta.env?.VITE_API_BASE_URL ??
  "https://itx-frontend-test.onrender.com";

export const API_TIMEOUT = Number(import.meta.env?.VITE_API_TIMEOUT ?? 5000);
export const API_MAX_RETRIES = Number(
  import.meta.env?.VITE_API_MAX_RETRIES ?? 3
);
export const API_RETRY_DELAY = Number(
  import.meta.env?.VITE_API_RETRY_DELAY ?? 1000
);

export const CACHE_DURATION = Number(
  import.meta.env?.VITE_CACHE_DURATION ?? 3600000
);
export const DB_NAME = import.meta.env?.VITE_DB_NAME ?? "ams-products-db";
export const DB_VERSION = Number(import.meta.env?.VITE_DB_VERSION ?? 1);
export const DB_STORE_NAME = import.meta.env?.VITE_DB_STORE_NAME ?? "products";
export const CART_STORE_NAME =
  import.meta.env?.VITE_CART_STORE_NAME ?? "cart-ids";
