import React, { useEffect, useState } from 'react';
import { getProducts } from '../../../data/repositories/productRepository';
import { ProductCard } from '../ProductCard';
import { SearchProduct } from '../SearchProduct';
import styles from './ProductGrid.module.css';

export const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch {
        setError('Error loading products');
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  const filteredProducts = products.filter(product => 
    product.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <div className={styles.loading}>Loading products...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <SearchProduct 
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search by model or brand..."
      />
      {filteredProducts.length === 0 ? (
        <div className={styles.noResults}>
          No products found matching your search criteria
        </div>
      ) : (
        <div className={styles.grid}>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              model={product.model}
              brand={product.brand}
              image={product.imgUrl}
            />
          ))}
        </div>
      )}
    </div>
  );
}; 