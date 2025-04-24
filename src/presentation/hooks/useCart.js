import { create } from "zustand";
import {
  getCartIds,
  saveCartId,
  isProductInCart,
} from "../../infrastructure/cache/indexedDB";

const useCart = create((set, get) => ({
  count: 0,

  initCart: async () => {
    const ids = await getCartIds();
    set({ count: ids.length });
  },

  addToCart: async (productId) => {
    const exists = await isProductInCart(productId);
    if (exists) {
      return false;
    }
    const saved = await saveCartId(productId);
    if (saved) {
      set((state) => ({ count: state.count + 1 }));
      return true;
    }
    return false;
  },

  getCount: () => get().count,
  isInCart: async (productId) => {
    return await isProductInCart(productId);
  },
}));

useCart.getState().initCart();

export { useCart };
