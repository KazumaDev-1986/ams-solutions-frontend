import { describe, jest, it, expect, beforeEach } from "@jest/globals";

jest.unstable_mockModule("../../../data/models/Cart", () => ({
  createCartItem: jest.fn((data) => ({ ...data, created: true })),
  createCart: jest.fn((data) => ({ ...data, processed: true })),
}));

const { addToCart } = await import("../../../data/repositories/cartRepository");

describe("cartRepository", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.fetch = jest.fn();
  });

  describe("addToCart", () => {
    const mockProductId = "123";
    const mockColorCode = 1;
    const mockStorageCode = 2;
    const mockCartItem = {
      id: mockProductId,
      colorCode: mockColorCode,
      storageCode: mockStorageCode,
    };
    const mockCartResponse = { items: [mockCartItem], total: 1 };

    it("should successfully add a product to cart", async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockCartResponse),
      });

      const result = await addToCart(
        mockProductId,
        mockColorCode,
        mockStorageCode
      );

      expect(fetch).toHaveBeenCalledWith(expect.stringContaining("/api/cart"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...mockCartItem, created: true }),
      });

      expect(result).toEqual({ ...mockCartResponse, processed: true });
    });

    it("should throw an error when the API request fails", async () => {
      const consoleSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});

      fetch.mockResolvedValueOnce({ ok: false });

      await expect(
        addToCart(mockProductId, mockColorCode, mockStorageCode)
      ).rejects.toThrow("Failed to add product to cart");

      consoleSpy.mockRestore();
    });

    it("should throw an error when fetch throws an error", async () => {
      const consoleSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});

      fetch.mockRejectedValueOnce(new Error("Network error"));

      await expect(
        addToCart(mockProductId, mockColorCode, mockStorageCode)
      ).rejects.toThrow("Network error");

      consoleSpy.mockRestore();
    });
  });
});
