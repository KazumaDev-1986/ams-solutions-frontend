import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productRepository } from '../../../../data/repositories/productRepository';
import ProductImage from '../ProductImage/ProductImage';
import ProductDescription from '../ProductDescription/ProductDescription';
import {ProductActions} from '../ProductActions/ProductActions';
import styles from './ProductDetailsView.module.css';

const ProductDetailsView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const productData = await productRepository.getProductDetails(id);
        setProduct(productData);
      } catch  {
        setError('The product does not exist or is not available');
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <p>Loading product details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p>{error}</p>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.leftColumn}>
        <ProductImage 
          imgUrl={product.imgUrl}
          brand={product.brand}
          model={product.model}
        />
      </div>
      <div className={styles.rightColumn}>
        <div className={styles.detailsSection}>
          <ProductDescription 
            brand={product.brand}
            model={product.model}
            price={product.price}
            cpu={product.cpu}
            ram={product.ram}
            os={product.os}
            displayResolution={product.displayResolution}
            battery={product.battery}
            primaryCamera={product.primaryCamera}
            dimentions={product.dimentions}
            weight={product.weight}
          />
        </div>
        <div className={styles.actionsSection}>
          <ProductActions 
            productId={product.id}
            options={product.options}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsView; 