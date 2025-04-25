import React from 'react';
import PropTypes from 'prop-types';
import styles from './ProductImage.module.css';

const ProductImage = ({ imgUrl, brand, model }) => {
  return (
    <div className={styles.container}>
      <img 
        src={imgUrl} 
        alt={`${brand} ${model}`}
        className={styles.image}
        loading="lazy"
      />
    </div>
  );
};

ProductImage.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
  model: PropTypes.string.isRequired,
};

export default ProductImage; 