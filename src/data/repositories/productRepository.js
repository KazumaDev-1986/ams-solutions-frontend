import { createProduct, createProductDetail } from "../models/Product";
import {
  getFromCache,
  saveToCache,
} from "../../infrastructure/cache/indexedDB";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Get product list
 * @returns {Promise<Array<import('../models/Product').Product>>}
 */
export const getProducts = async () => {
  try {
    const cachedData = await getFromCache("list");
    if (cachedData) {
      return cachedData.map(createProduct);
    }

    const response = await fetch(`${API_BASE_URL}/api/product`);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();
    await saveToCache("list", data);

    return data.map(createProduct);
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

/**
 * Get product details
 * @param {string} id - Product id
 * @returns {Promise<import('../models/ProductDetail').ProductDetail>}
 */
export const getProductDetails = async (id) => {
  try {
    const cachedData = await getFromCache(id);
    if (cachedData) {
      return createProductDetail(cachedData);
    }

    const response = await fetch(`${API_BASE_URL}/api/product/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch product details");
    }

    const data = await response.json();
    await saveToCache(id, data);

    return createProductDetail(data);
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw error;
  }
};
