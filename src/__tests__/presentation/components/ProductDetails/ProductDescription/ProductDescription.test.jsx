import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import ProductDescription from '../../../../../presentation/components/ProductDetails/ProductDescription/ProductDescription';
import styles from '../../../../../presentation/components/ProductDetails/ProductDescription/ProductDescription.module.css';

describe('ProductDescription', () => {
  const minimalProps = {
    brand: 'Apple',
    model: 'iPhone 12'
  };

  const fullProps = {
    ...minimalProps,
    price: '950',
    cpu: 'A14 Bionic',
    ram: '4GB',
    os: 'iOS 14',
    displayResolution: '2532 x 1170',
    battery: '2815 mAh',
    primaryCamera: '12 MP',
    dimentions: '146.7 x 71.5 x 7.4 mm',
    weight: '164 g'
  };

  test('renders with minimal required props', () => {
    render(<ProductDescription {...minimalProps} />);
    
    expect(screen.getByText('Apple iPhone 12')).toBeInTheDocument();
    expect(screen.queryByText('€')).not.toBeInTheDocument();
  });

  test('renders with all props as simple strings', () => {
    render(<ProductDescription {...fullProps} />);
    
    expect(screen.getByText('Apple iPhone 12')).toBeInTheDocument();
    expect(screen.getByText('950€')).toBeInTheDocument();
    expect(screen.getByText('CPU:')).toBeInTheDocument();
    expect(screen.getByText('A14 Bionic')).toBeInTheDocument();
    expect(screen.getByText('RAM:')).toBeInTheDocument();
    expect(screen.getByText('4GB')).toBeInTheDocument();
    expect(screen.getByText('Sistema Operativo:')).toBeInTheDocument();
    expect(screen.getByText('iOS 14')).toBeInTheDocument();
    expect(screen.getByText('Resolución:')).toBeInTheDocument();
    expect(screen.getByText('2532 x 1170')).toBeInTheDocument();
    expect(screen.getByText('Batería:')).toBeInTheDocument();
    expect(screen.getByText('2815 mAh')).toBeInTheDocument();
    expect(screen.getByText('Cámara:')).toBeInTheDocument();
    expect(screen.getByText('12 MP')).toBeInTheDocument();
    expect(screen.getByText('Tamaño:')).toBeInTheDocument();
    expect(screen.getByText('146.7 x 71.5 x 7.4 mm')).toBeInTheDocument();
    expect(screen.getByText('Peso:')).toBeInTheDocument();
    expect(screen.getByText('164 g')).toBeInTheDocument();
  });

  test('handles primaryCamera as array', () => {
    const propsWithCameraArray = {
      ...minimalProps,
      primaryCamera: ['12 MP Wide', '12 MP Ultra Wide']
    };

    render(<ProductDescription {...propsWithCameraArray} />);
    
    expect(screen.getByText('Cámara 1:')).toBeInTheDocument();
    expect(screen.getByText('12 MP Wide')).toBeInTheDocument();
    expect(screen.getByText('Cámara 2:')).toBeInTheDocument();
    expect(screen.getByText('12 MP Ultra Wide')).toBeInTheDocument();
  });

  test('handles os as array', () => {
    const propsWithOsArray = {
      ...minimalProps,
      os: ['Android 12', 'MIUI 13']
    };

    render(<ProductDescription {...propsWithOsArray} />);
    
    expect(screen.getByText('Sistema Operativo:')).toBeInTheDocument();
    expect(screen.getByText(/Android 12/)).toBeInTheDocument();
    expect(screen.getByText(/MIUI 13/)).toBeInTheDocument();
  });

  test('conditionally renders sections based on props', () => {
    render(<ProductDescription {...minimalProps} />);
    
    expect(screen.queryByText('Características principales')).not.toBeInTheDocument();
    expect(screen.queryByText('Cámara')).not.toBeInTheDocument();
    expect(screen.queryByText('Dimensiones')).not.toBeInTheDocument();
    render(<ProductDescription {...minimalProps} cpu="A14" weight="164 g" />);
    expect(screen.getByText('Características principales')).toBeInTheDocument();
    expect(screen.queryByText('Cámara')).not.toBeInTheDocument();
    expect(screen.getByText('Dimensiones')).toBeInTheDocument();
  });

  test('applies correct CSS classes', () => {
    render(<ProductDescription {...fullProps} />);
    
    expect(screen.getByText('Apple iPhone 12').parentElement).toHaveClass(styles.header);
    expect(screen.getByText('950€')).toHaveClass(styles.price);
    expect(screen.getByText('Características principales')).toHaveClass(styles.groupTitle);
    
    const specItems = screen.getAllByRole('listitem');
    specItems.forEach(item => {
      expect(item).toHaveClass(styles.specItem);
    });
  });
}); 