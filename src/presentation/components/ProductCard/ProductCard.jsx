import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './ProductCard.module.css';

export const ProductCard = ({ id, model, brand, image }) => {
  return (
    <Link to={`/product/${id}`} className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={image} alt={model} className={styles.image} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.model}>{model}</h3>
        <p className={styles.brand}>{brand}</p>
      </div>
    </Link>
  );
};

ProductCard.propTypes = {
  id: PropTypes.string.isRequired,
  model: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
}; 