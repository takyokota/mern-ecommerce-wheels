import React, { Fragment } from 'react';
import Header from '../components/layouts/Header';
import ProductDetail from '../components/stores/ProductDetail';

const ProductDetailPage = () => {

  return (
    <Fragment>
      <Header />
      <h1 className='text-center'>Product Detail</h1>
      <a href={'/products'}>&lt; Back to Products</a>

      <ProductDetail />
    </Fragment>
  );
};

export default ProductDetailPage;