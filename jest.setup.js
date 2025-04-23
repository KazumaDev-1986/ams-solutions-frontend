import "@testing-library/jest-dom";

// Mock environment variables
const env = {
  VITE_API_BASE_URL: "https://itx-frontend-test.onrender.com",
  VITE_CACHE_DURATION: "3600000",
  VITE_DB_NAME: "ams-products-db",
  VITE_DB_VERSION: "1",
  VITE_DB_STORE_NAME: "products",
};

// Mock fetch
window.fetch = () =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  });

// Mock IndexedDB
const mockIndexedDB = {
  open: () => ({
    onerror: null,
    onsuccess: null,
    onupgradeneeded: null,
  }),
  deleteDatabase: () => {},
};

Object.defineProperty(window, "indexedDB", {
  value: mockIndexedDB,
});

// Mock environment variables
Object.defineProperty(window, "env", {
  value: env,
});
