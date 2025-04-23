import React from 'react';
import { Link } from 'react-router-dom';

const ProductListPage = () => {
  return (
    <div>
      <h1>Product List</h1>
      <Link to="/product/1">Go to Product Details</Link>
    </div>
  );
};

export default ProductListPage; 