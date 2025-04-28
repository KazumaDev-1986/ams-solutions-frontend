import { createProduct } from "../models/Product";
import { createProductDetail } from "../models/ProductDetail";
import {
  getFromCache,
  saveToCache,
} from "../../infrastructure/cache/indexedDB";
import { apiClient } from "../../infrastructure/http/apiClient";
import { ERROR_CODES } from "../../infrastructure/http/errorCodes";

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

    const data = await apiClient.get("/api/product");
    await saveToCache("list", data);
    return data.map(createProduct);
  } catch (error) {
    console.error("Error fetching products:", error);
    if (error.code === ERROR_CODES.TIMEOUT) {
      throw new Error(
        "The server is taking too long to respond. Please try again in a moment."
      );
    }
    if (error.code === ERROR_CODES.MAX_RETRIES_EXCEEDED) {
      throw new Error(
        "Unable to connect to the server. Please check your connection and try again."
      );
    }
    throw new Error("Failed to fetch products. Please try again later.");
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

    const data = await apiClient.get(`/api/product/${id}`);
    await saveToCache(id, data);
    return createProductDetail(data);
  } catch (error) {
    console.error("Error fetching product details:", error);
    if (error.code === ERROR_CODES.TIMEOUT) {
      throw new Error(
        "The server is taking too long to respond. Please try again in a moment."
      );
    }
    if (error.code === ERROR_CODES.MAX_RETRIES_EXCEEDED) {
      throw new Error(
        "Unable to connect to the server. Please check your connection and try again."
      );
    }
    throw new Error("Failed to fetch product details. Please try again later.");
  }
};

export const productRepository = {
  getProducts,
  getProductDetails,
};
