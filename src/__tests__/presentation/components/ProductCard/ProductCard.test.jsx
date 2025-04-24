import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ProductCard } from "../../../../presentation/components/ProductCard/ProductCard";
import { describe, test, expect } from "vitest";

const mockProduct = {
  id: "1",
  model: "iPhone 12",
  brand: "Apple",
  image: "iphone12.jpg",
};

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("ProductCard", () => {
  test("renders product information correctly", () => {
    renderWithRouter(<ProductCard {...mockProduct} />);

    expect(screen.getByText(mockProduct.model)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.brand)).toBeInTheDocument();
    expect(screen.getByAltText(mockProduct.model)).toHaveAttribute(
      "src",
      mockProduct.image
    );
  });

  test("renders without brand when not provided", () => {
    const productWithoutBrand = { ...mockProduct, brand: undefined };
    renderWithRouter(<ProductCard {...productWithoutBrand} />);

    expect(screen.getByText(mockProduct.model)).toBeInTheDocument();
    expect(screen.queryByText(mockProduct.brand)).not.toBeInTheDocument();
  });

  test("links to correct product detail page", () => {
    renderWithRouter(<ProductCard {...mockProduct} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", `/product/${mockProduct.id}`);
  });
});
