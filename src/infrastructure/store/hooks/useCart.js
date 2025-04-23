import { useCartStore } from "../cart/cartStore";

export const useCart = () => {
  const count = useCartStore((state) => state.count);
  const addToCart = useCartStore((state) => state.addToCart);
  const getCartCount = useCartStore((state) => state.getCartCount);

  return {
    count,
    addToCart,
    getCartCount,
  };
};
