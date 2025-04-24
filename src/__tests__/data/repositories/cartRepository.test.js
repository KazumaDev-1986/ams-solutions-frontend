import { describe, vi, it, expect, beforeEach } from "vitest";

vi.mock("../../../data/models/Cart", () => ({
  createCartItem: vi.fn((data) => ({ ...data, created: true })),
  createCart: vi.fn((data) => ({ ...data, processed: true })),
}));

const { cartRepository } = await import(
  "../../../data/repositories/cartRepository"
);

describe("cartRepository", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.fetch = vi.fn();
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

      const result = await cartRepository.addToCart(
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
      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      fetch.mockResolvedValueOnce({ ok: false });

      await expect(
        cartRepository.addToCart(mockProductId, mockColorCode, mockStorageCode)
      ).rejects.toThrow("Failed to add product to cart");

      consoleSpy.mockRestore();
    });

    it("should throw an error when fetch throws an error", async () => {
      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      fetch.mockRejectedValueOnce(new Error("Network error"));

      await expect(
        cartRepository.addToCart(mockProductId, mockColorCode, mockStorageCode)
      ).rejects.toThrow("Network error");

      consoleSpy.mockRestore();
    });
  });
});
