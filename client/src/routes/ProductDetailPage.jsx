import React, { Fragment } from 'react';
import Header from '../components/layouts/Header';
import { useParams } from 'react-router-dom';
import ProductDetail from '../components/stores/ProductDetail';

const ProductDetailPage = () => {
  const { id } = useParams();

  return (
    <Fragment>
      <Header />
      <h1 className='text-center'>Product Detail</h1>
      <a href={'/products'}>&lt; Back to Products</a>

      <ProductDetail id={id} />
    </Fragment>
  );
};

export default ProductDetailPage;