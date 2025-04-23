import { describe, test, expect } from "@jest/globals";
import { createCartItem, createCart } from "../../data/models/Cart";

describe("Cart Model", () => {
  describe("CartItem", () => {
    const mockCartItemData = {
      id: "test-id",
      colorCode: 1000,
      storageCode: 2000,
    };

    test("should create a cart item with valid data", () => {
      const cartItem = createCartItem(mockCartItemData);
      expect(cartItem).toEqual(mockCartItemData);
    });

    test("should handle missing optional fields", () => {
      const cartItem = createCartItem({
        id: "test-id",
      });

      expect(cartItem).toEqual({
        id: "test-id",
        colorCode: undefined,
        storageCode: undefined,
      });
    });

    test("should not modify the input data", () => {
      const inputData = { ...mockCartItemData };
      createCartItem(inputData);
      expect(inputData).toEqual(mockCartItemData);
    });
  });

  describe("Cart", () => {
    const mockCartData = {
      count: 1,
    };

    test("should create a cart with valid data", () => {
      const cart = createCart(mockCartData);
      expect(cart).toEqual(mockCartData);
    });

    test("should handle missing optional fields", () => {
      const cart = createCart({});
      expect(cart).toEqual({
        count: undefined,
      });
    });

    test("should not modify the input data", () => {
      const inputData = { ...mockCartData };
      createCart(inputData);
      expect(inputData).toEqual(mockCartData);
    });
  });
});
