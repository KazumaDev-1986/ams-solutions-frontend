import { describe, vi, it, expect, beforeEach } from "vitest";

vi.mock("../../../data/models/Product", () => ({
  createProduct: vi.fn((data) => ({ ...data, processed: true })),
}));

vi.mock("../../../data/models/ProductDetail", () => ({
  createProductDetail: vi.fn((data) => ({ ...data, processed: true })),
}));

vi.mock("../../../infrastructure/cache/indexedDB", () => ({
  getFromCache: vi.fn(),
  saveToCache: vi.fn(),
}));

const { productRepository } = await import(
  "../../../data/repositories/productRepository"
);

describe("productRepository", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.fetch = vi.fn();
  });

  describe("getProducts", () => {
    const mockProducts = [
      { id: "1", name: "Product 1" },
      { id: "2", name: "Product 2" },
    ];

    it("should return products from cache when available", async () => {
      const { getFromCache } = await import(
        "../../../infrastructure/cache/indexedDB"
      );
      getFromCache.mockResolvedValueOnce(mockProducts);

      const result = await productRepository.getProducts();

      expect(getFromCache).toHaveBeenCalledWith("list");
      expect(result).toEqual(
        mockProducts.map((product) => ({ ...product, processed: true }))
      );
    });

    it("should fetch products from API when cache is empty", async () => {
      const { getFromCache, saveToCache } = await import(
        "../../../infrastructure/cache/indexedDB"
      );
      getFromCache.mockResolvedValueOnce(null);
      fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockProducts),
      });

      const result = await productRepository.getProducts();

      expect(getFromCache).toHaveBeenCalledWith("list");
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/api/product")
      );
      expect(saveToCache).toHaveBeenCalledWith("list", mockProducts);
      expect(result).toEqual(
        mockProducts.map((product) => ({ ...product, processed: true }))
      );
    });

    it("should throw an error when API request fails", async () => {
      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});
      const { getFromCache } = await import(
        "../../../infrastructure/cache/indexedDB"
      );
      getFromCache.mockResolvedValueOnce(null);
      fetch.mockResolvedValueOnce({ ok: false });

      await expect(productRepository.getProducts()).rejects.toThrow(
        "Failed to fetch products"
      );

      consoleSpy.mockRestore();
    });
  });

  describe("getProductDetails", () => {
    const mockProductId = "123";
    const mockProductDetail = {
      id: mockProductId,
      name: "Product Detail",
      description: "Description",
    };

    it("should return product details from cache when available", async () => {
      const { getFromCache } = await import(
        "../../../infrastructure/cache/indexedDB"
      );
      getFromCache.mockResolvedValueOnce(mockProductDetail);

      const result = await productRepository.getProductDetails(mockProductId);

      expect(getFromCache).toHaveBeenCalledWith(mockProductId);
      expect(result).toEqual({ ...mockProductDetail, processed: true });
    });

    it("should fetch product details from API when cache is empty", async () => {
      const { getFromCache, saveToCache } = await import(
        "../../../infrastructure/cache/indexedDB"
      );
      getFromCache.mockResolvedValueOnce(null);
      fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockProductDetail),
      });

      const result = await productRepository.getProductDetails(mockProductId);

      expect(getFromCache).toHaveBeenCalledWith(mockProductId);
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining(`/api/product/${mockProductId}`)
      );
      expect(saveToCache).toHaveBeenCalledWith(
        mockProductId,
        mockProductDetail
      );
      expect(result).toEqual({ ...mockProductDetail, processed: true });
    });

    it("should throw an error when API request fails", async () => {
      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});
      const { getFromCache } = await import(
        "../../../infrastructure/cache/indexedDB"
      );
      getFromCache.mockResolvedValueOnce(null);
      fetch.mockResolvedValueOnce({ ok: false });

      await expect(
        productRepository.getProductDetails(mockProductId)
      ).rejects.toThrow("Failed to fetch product details");

      consoleSpy.mockRestore();
    });
  });
});
