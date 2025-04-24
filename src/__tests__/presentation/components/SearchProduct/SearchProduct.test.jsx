import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { SearchProduct } from '../../../../presentation/components/SearchProduct/SearchProduct';

describe('SearchProduct', () => {
  test('renders search input with placeholder', () => {
    const placeholder = 'Search products...';
    render(<SearchProduct value="" onChange={() => {}} placeholder={placeholder} />);
    
    const input = screen.getByPlaceholderText(placeholder);
    expect(input).toBeInTheDocument();
  });

  test('renders search icon', () => {
    render(<SearchProduct value="" onChange={() => {}} />);
    
    const icon = screen.getByTestId('search-icon');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg');
  });

  test('calls onChange when input value changes', () => {
    const handleChange = vi.fn();
    render(<SearchProduct value="" onChange={handleChange} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });
    
    expect(handleChange).toHaveBeenCalledWith('test');
  });

  test('displays the provided value', () => {
    const value = 'test value';
    render(<SearchProduct value={value} onChange={() => {}} />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue(value);
  });
}); 