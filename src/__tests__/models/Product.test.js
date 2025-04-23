import { describe, test, expect } from "@jest/globals";
import { createProduct } from "../../data/models/Product";

describe("Product Model", () => {
  const mockProductData = {
    id: "test-id",
    brand: "Test Brand",
    model: "Test Model",
    price: "100",
    imgUrl: "https://test.com/image.jpg",
  };

  test("should create a product with valid data", () => {
    const product = createProduct(mockProductData);

    expect(product).toEqual({
      id: "test-id",
      brand: "Test Brand",
      model: "Test Model",
      price: "100",
      imgUrl: "https://test.com/image.jpg",
    });
  });

  test("should handle missing optional fields", () => {
    const product = createProduct({
      id: "test-id",
      brand: "Test Brand",
      model: "Test Model",
      price: "100",
    });

    expect(product).toEqual({
      id: "test-id",
      brand: "Test Brand",
      model: "Test Model",
      price: "100",
      imgUrl: undefined,
    });
  });

  test("should not modify the input data", () => {
    const inputData = { ...mockProductData };
    createProduct(inputData);

    expect(inputData).toEqual(mockProductData);
  });
});
