import { createCartItem, createCart } from "../models/Cart";
import { API_BASE_URL } from "../../config/env";

/**
 * Add product to cart
 * @param {string} id - Product id
 * @param {number} colorCode - Selected color code
 * @param {number} storageCode - Selected storage code
 * @returns {Promise<import('../models/Cart').Cart>}
 */
const addToCart = async (id, colorCode, storageCode) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createCartItem({ id, colorCode, storageCode })),
    });

    if (!response.ok) {
      throw new Error("Failed to add product to cart");
    }

    const data = await response.json();
    return createCart(data);
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};

export const cartRepository = {
  addToCart,
};
