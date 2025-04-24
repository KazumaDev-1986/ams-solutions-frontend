import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { ProductGrid } from '../../../../presentation/components/ProductGrid/ProductGrid';

vi.mock('../../../../data/repositories/productRepository', () => ({
  productRepository: {
    getProducts: vi.fn()
  }
}));

vi.mock('../../../../presentation/components/ProductCard', () => ({
  ProductCard: ({ id, model, brand }) => (
    <div data-testid={`product-card-${id}`}>
      {model} - {brand}
    </div>
  )
}));

vi.mock('../../../../presentation/components/SearchProduct', () => ({
  SearchProduct: ({ value, onChange, placeholder }) => (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}));

import { productRepository } from '../../../../data/repositories/productRepository';

describe('ProductGrid', () => {
  const mockProducts = [
    { id: '1', model: 'iPhone 12', brand: 'Apple', imgUrl: 'iphone12.jpg' },
    { id: '2', model: 'Galaxy S21', brand: 'Samsung', imgUrl: 'galaxy.jpg' },
    { id: '3', model: 'Pixel 6', brand: 'Google', imgUrl: 'pixel.jpg' }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('shows loading state initially', () => {
    productRepository.getProducts.mockImplementation(() => new Promise(() => {}));
    render(<ProductGrid />);
    expect(screen.getByText((content) => content.includes('Loading products'))).toBeInTheDocument();
  });

  test('shows error state when products fail to load', async () => {
    productRepository.getProducts.mockRejectedValueOnce(new Error('Failed to load'));
    render(<ProductGrid />);
    const errorMessage = await screen.findByText(/Error loading products/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test('renders products when loaded successfully', async () => {
    productRepository.getProducts.mockResolvedValueOnce(mockProducts);
    render(<ProductGrid />);
    const productCards = await screen.findAllByTestId(/product-card-/);
    expect(productCards).toHaveLength(3);
  });

  test('filters products based on search term', async () => {
    productRepository.getProducts.mockResolvedValueOnce(mockProducts);
    render(<ProductGrid />);
    const searchInput = await screen.findByPlaceholderText('Search by model or brand...');
    fireEvent.change(searchInput, { target: { value: 'iPhone' } });
    const productCards = screen.getAllByTestId(/product-card-/);
    expect(productCards).toHaveLength(1);
    expect(productCards[0]).toHaveTextContent('iPhone 12 - Apple');
  });

  test('shows no results message when no products match search', async () => {
    productRepository.getProducts.mockResolvedValueOnce(mockProducts);
    render(<ProductGrid />);
    const searchInput = await screen.findByPlaceholderText('Search by model or brand...');
    fireEvent.change(searchInput, { target: { value: 'NonExistent' } });
    expect(screen.getByText('No products found matching your search criteria')).toBeInTheDocument();
  });
});
