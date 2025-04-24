import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import CartCounter from '../../../../presentation/components/CartCounter/CartCounter';
import { useCart } from '../../../../presentation/hooks/useCart';

vi.mock('../../../../presentation/hooks/useCart', () => ({
  useCart: vi.fn()
}));

describe('CartCounter', () => {
  test('renders cart counter with zero items', () => {
    vi.mocked(useCart).mockReturnValue({ count: 0 });

    render(<CartCounter />);
    
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  test('renders cart counter with multiple items', () => {
    vi.mocked(useCart).mockReturnValue({ count: 5 });

    render(<CartCounter />);
    
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  test('renders cart icon', () => {
    vi.mocked(useCart).mockReturnValue({ count: 0 });

    render(<CartCounter />);
    
    const svg = screen.getByTestId('cart-icon');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg');
  });
}); 