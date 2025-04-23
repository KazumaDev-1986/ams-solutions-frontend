import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import CartCounter from '../CartCounter';
import styles from './Header.module.css';

export const Header = () => {
  const location = useLocation();
  const isProductPage = location.pathname.includes('/product/');

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <div className={styles.titleContainer}>
          <Link to="/" className={styles.title}>
            AMS Solutions
          </Link>
          <nav className={styles.breadcrumbs}>
            <Link to="/">Home</Link>
            {isProductPage && (
              <>
                <span className={styles.separator}>/</span>
                <span>Product</span>
              </>
            )}
          </nav>
        </div>

        <div className={styles.cart}>
          <CartCounter />
        </div>
      </div>
    </header>
  );
}; 