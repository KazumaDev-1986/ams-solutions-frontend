import React from 'react';
import ProductDetailsView from '../components/ProductDetails/ProductDetailsView/ProductDetailsView';
import styles from './ProductDetailsPage.module.css';

const ProductDetailsPage = () => {
  return (
    <div className={styles.container}>
      <ProductDetailsView />
    </div>
  );
};

export default ProductDetailsPage; 