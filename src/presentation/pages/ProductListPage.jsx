import React from 'react';
import { ProductGrid } from '../components/ProductGrid';
import styles from './ProductListPage.module.css';

const ProductListPage = () => {
  return (
    <div className={styles.container}>
      <ProductGrid />
    </div>
  );
};

export default ProductListPage; 