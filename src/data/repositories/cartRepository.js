import { createCartItem, createCart } from "../models/Cart";
import { apiClient } from "../../infrastructure/http/apiClient";
import { ERROR_CODES } from "../../infrastructure/http/errorCodes";

/**
 * Add product to cart
 * @param {string} id - Product id
 * @param {number} colorCode - Selected color code
 * @param {number} storageCode - Selected storage code
 * @returns {Promise<import('../models/Cart').Cart>}
 */
const addToCart = async (id, colorCode, storageCode) => {
  try {
    const data = await apiClient.post(
      "/api/cart",
      createCartItem({ id, colorCode, storageCode })
    );
    return createCart(data);
  } catch (error) {
    console.error("Error adding to cart:", error);
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
    throw new Error("Failed to add product to cart. Please try again later.");
  }
};

export const cartRepository = {
  addToCart,
};
