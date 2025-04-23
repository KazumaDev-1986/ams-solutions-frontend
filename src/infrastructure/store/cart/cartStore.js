import { create } from "zustand";

const createCartSlice = (set, get) => ({
  count: 0,
  addToCart: () => set((state) => ({ count: state.count + 1 })),
  getCartCount: () => get().count,
});

export const useCartStore = create()((...args) => ({
  ...createCartSlice(...args),
}));
