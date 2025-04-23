import React from 'react';
import { useCart } from '../../../infrastructure/store/hooks/useCart';
import styles from './CartCounter.module.css';

const CartCounter = () => {
  const { count } = useCart();

  return (
    <div className={styles.container}>
      <svg 
        className={styles.icon}
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
      <div className={styles.counter}>
        <span className={styles.value}>{count}</span>
      </div>
    </div>
  );
};

export default CartCounter; 