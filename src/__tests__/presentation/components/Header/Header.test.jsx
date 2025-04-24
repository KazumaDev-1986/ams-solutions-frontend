import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { describe, test, expect, vi } from 'vitest';
import { Header } from '../../../../presentation/components/Header/Header';

vi.mock('../../../../presentation/components/CartCounter', () => ({
  default: () => <div data-testid="cart-counter">Cart Counter</div>
}));

describe('Header', () => {
  test('renders header with title and navigation', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    expect(screen.getByText('AMS Solutions')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByTestId('cart-counter')).toBeInTheDocument();
  });

  test('shows product breadcrumb when on product page', () => {
    render(
      <MemoryRouter initialEntries={['/product/123']}>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText('Product')).toBeInTheDocument();
    expect(screen.getByText('/')).toBeInTheDocument();
  });

  test('does not show product breadcrumb when not on product page', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Header />
      </MemoryRouter>
    );

    expect(screen.queryByText('Product')).not.toBeInTheDocument();
    expect(screen.queryByText('/')).not.toBeInTheDocument();
  });

  test('title links to home page', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const titleLink = screen.getByText('AMS Solutions');
    expect(titleLink).toHaveAttribute('href', '/');
  });
}); 