import { createProduct } from "../models/Product";
import { createProductDetail } from "../models/ProductDetail";
import {
  getFromCache,
  saveToCache,
} from "../../infrastructure/cache/indexedDB";
import { API_BASE_URL } from "../../config/env";

/**
 * Get product list
 * @returns {Promise<Array<import('../models/Product').Product>>}
 */
const getProducts = async () => {
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
const getProductDetails = async (id) => {
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

export const productRepository = {
  getProducts,
  getProductDetails,
};
