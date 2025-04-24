import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../hooks/useCart';
import { cartRepository } from '../../../../data/repositories/cartRepository';
import styles from './ProductActions.module.css';

export const ProductActions = ({ productId, options }) => {
  const navigate = useNavigate();
  const { addToCart, isInCart } = useCart();
  const [selectedColor, setSelectedColor] = useState(options.colors[0]?.code);
  const [selectedStorage, setSelectedStorage] = useState(options.storages[0]?.code);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isInCartAlready, setIsInCartAlready] = useState(false);

  useEffect(() => {
    const checkCartStatus = async () => {
      const inCart = await isInCart(productId);
      setIsInCartAlready(inCart);
    };
    checkCartStatus();
  }, [productId, isInCart]);

  const handleAddToCart = async () => {
    try {
      if (isInCartAlready) {
        setError('This product is already in your cart');
        return;
      }

      setIsLoading(true);
      setError(null);
      
      await cartRepository.addToCart(productId, selectedColor, selectedStorage);
      const added = await addToCart(productId);
      
      if (added) {
        alert('Product added to cart!');
        navigate('/');
      } else {
        setError('This product is already in your cart');
      }

    } catch (error) {
      console.error(error);
      setError('Error adding to cart. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.options}>
        <div className={styles.optionGroup}>
          <label className={styles.label}>Color:</label>
          <select 
            className={styles.select}
            value={selectedColor}
            onChange={(e) => setSelectedColor(Number(e.target.value))}
            disabled={isInCartAlready}
          >
            {options.colors.map(color => (
              <option key={color.code} value={color.code}>
                {color.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.optionGroup}>
          <label className={styles.label}>Almacenamiento:</label>
          <select 
            className={styles.select}
            value={selectedStorage}
            onChange={(e) => setSelectedStorage(Number(e.target.value))}
            disabled={isInCartAlready}
          >
            {options.storages.map(storage => (
              <option key={storage.code} value={storage.code}>
                {storage.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <button 
        className={styles.addButton}
        onClick={handleAddToCart}
        disabled={isLoading || !selectedColor || !selectedStorage || isInCartAlready}
      >
        {isLoading ? 'Adding...' : isInCartAlready ? 'In Cart' : 'Add to cart'}
      </button>
    </div>
  );
};

ProductActions.propTypes = {
  productId: PropTypes.string.isRequired,
  options: PropTypes.shape({
    colors: PropTypes.arrayOf(
      PropTypes.shape({
        code: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
    storages: PropTypes.arrayOf(
      PropTypes.shape({
        code: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};
