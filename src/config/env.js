export const API_BASE_URL =
  import.meta.env?.VITE_API_BASE_URL ??
  "https://itx-frontend-test.onrender.com";
export const CACHE_DURATION = import.meta.env?.VITE_CACHE_DURATION ?? "3600000";
export const DB_NAME = import.meta.env?.VITE_DB_NAME ?? "ams-products-db";
export const DB_VERSION = import.meta.env?.VITE_DB_VERSION ?? "1";
export const DB_STORE_NAME = import.meta.env?.VITE_DB_STORE_NAME ?? "products";
