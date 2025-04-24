import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, test, expect, beforeEach, vi } from 'vitest';
import ProductImage from '../../../../../presentation/components/ProductDetails/ProductImage/ProductImage';
import styles from '../../../../../presentation/components/ProductDetails/ProductImage/ProductImage.module.css';

describe('ProductImage', () => {
  const defaultProps = {
    imgUrl: 'https://example.com/phone.jpg',
    brand: 'Apple',
    model: 'iPhone 12'
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders the image with correct src and alt text', () => {
    render(<ProductImage {...defaultProps} />);
    
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', defaultProps.imgUrl);
    expect(image).toHaveAttribute('alt', `${defaultProps.brand} ${defaultProps.model}`);
  });

  test('applies correct CSS classes', () => {
    render(<ProductImage {...defaultProps} />);
    
    const container = screen.getByRole('img').parentElement;
    expect(container).toHaveClass(styles.container);
    expect(screen.getByRole('img')).toHaveClass(styles.image);
  });

  test('renders with different props values', () => {
    const newProps = {
      imgUrl: 'https://example.com/different.jpg',
      brand: 'Samsung',
      model: 'Galaxy S21'
    };

    render(<ProductImage {...newProps} />);
    
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', newProps.imgUrl);
    expect(image).toHaveAttribute('alt', `${newProps.brand} ${newProps.model}`);
  });
}); 