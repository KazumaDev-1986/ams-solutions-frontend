import {
  DB_NAME,
  DB_VERSION,
  DB_STORE_NAME,
  CART_STORE_NAME,
  CACHE_DURATION,
} from "../../config/env";

/**
 * Initialize IndexedDB
 * @returns {Promise<IDBDatabase>}
 */
export const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(DB_STORE_NAME)) {
        const store = db.createObjectStore(DB_STORE_NAME, { keyPath: "id" });
        store.createIndex("timestamp", "timestamp", { unique: false });
      }
      if (!db.objectStoreNames.contains(CART_STORE_NAME)) {
        db.createObjectStore(CART_STORE_NAME, { keyPath: "id" });
      }
    };
  });
};

/**
 * Get data from cache
 * @param {string} id - Cache key
 * @returns {Promise<Object|null>}
 */
export const getFromCache = async (id) => {
  try {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([DB_STORE_NAME], "readonly");
      const store = transaction.objectStore(DB_STORE_NAME);
      const request = store.get(id);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const data = request.result;
        if (!data) {
          resolve(null);
          return;
        }

        const now = Date.now();
        if (now - data.timestamp > CACHE_DURATION) {
          resolve(null);
          return;
        }

        resolve(data.value);
      };
    });
  } catch (error) {
    console.error("Error getting from cache:", error);
    return null;
  }
};

/**
 * Save data to cache
 * @param {string} id - Cache key
 * @param {Object} data - Data to cache
 */
export const saveToCache = async (id, data) => {
  try {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([DB_STORE_NAME], "readwrite");
      const store = transaction.objectStore(DB_STORE_NAME);
      const request = store.put({
        id,
        value: data,
        timestamp: Date.now(),
      });

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  } catch (error) {
    console.error("Error saving to cache:", error);
  }
};

/**
 * Get all cart product IDs
 * @returns {Promise<string[]>} Array of product IDs
 */
export const getCartIds = async () => {
  try {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([CART_STORE_NAME], "readonly");
      const store = transaction.objectStore(CART_STORE_NAME);
      const request = store.getAllKeys();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result || []);
    });
  } catch (error) {
    console.error("Error getting cart IDs:", error);
    return [];
  }
};

/**
 * Save product ID to cart
 * @param {string} productId - Product ID to save
 * @returns {Promise<boolean>} True if saved successfully
 */
export const saveCartId = async (productId) => {
  try {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([CART_STORE_NAME], "readwrite");
      const store = transaction.objectStore(CART_STORE_NAME);
      const request = store.put({ id: productId });

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(true);
    });
  } catch (error) {
    console.error("Error saving cart ID:", error);
    return false;
  }
};

/**
 * Check if product ID exists in cart
 * @param {string} productId - Product ID to check
 * @returns {Promise<boolean>} True if product exists in cart
 */
export const isProductInCart = async (productId) => {
  try {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([CART_STORE_NAME], "readonly");
      const store = transaction.objectStore(CART_STORE_NAME);
      const request = store.get(productId);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(!!request.result);
    });
  } catch (error) {
    console.error("Error checking product in cart:", error);
    return false;
  }
};
