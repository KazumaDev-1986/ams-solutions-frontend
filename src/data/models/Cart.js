/**
 * @typedef {Object} CartItem
 * @property {string} id - Product identifier
 * @property {number} colorCode - Selected color code
 * @property {number} storageCode - Selected storage code
 */

/**
 * @typedef {Object} Cart
 * @property {number} count - Number of items in cart
 */

/**
 * Creates a CartItem instance
 * @param {Object} data - Cart item data
 * @returns {CartItem}
 */
export const createCartItem = (data) => ({
  id: data.id,
  colorCode: data.colorCode,
  storageCode: data.storageCode,
});

/**
 * Creates a Cart instance
 * @param {Object} data - Cart data
 * @returns {Cart}
 */
export const createCart = (data) => ({
  count: data.count,
});
