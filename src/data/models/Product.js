/**
 * @typedef {Object} Product
 * @property {string} id - Unique product identifier
 * @property {string} brand - Product brand
 * @property {string} model - Product model
 * @property {string} price - Product price
 * @property {string} imgUrl - Product image URL
 */

/**
 * Creates a Product instance
 * @param {Object} data - Product data
 * @returns {Product}
 */
export const createProduct = (data) => ({
  id: data.id,
  brand: data.brand,
  model: data.model,
  price: data.price,
  imgUrl: data.imgUrl,
});
