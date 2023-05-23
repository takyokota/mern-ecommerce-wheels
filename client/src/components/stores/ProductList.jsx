import React, { useContext } from 'react';
import ProductCard from './ProductCard';
import '../style.css';
import { ProductsContext } from '../../context/ProductsContext';

const ProductList = (props) => {
  const { products } = useContext(ProductsContext);

  // to convert date to milliseconds
  const convertDate = (date) => {
    const result = new Date(date);
    return result.getTime();
  };

  // Sorting
  switch (props.sortBy) {
    case "Oldest":
      products.sort((a, b) => (convertDate(a.updatedAt) > convertDate(b.updatedAt)) ? 1 : ((convertDate(b.updatedAt) > convertDate(a.updatedAt)) ? -1 : 0));
      break;
    case "Price Low to High":
      products.sort((a, b) => (parseInt(a.price) > parseInt(b.price)) ? 1 : ((parseInt(b.price) > parseInt(a.price)) ? -1 : 0));
      break;
    case "Price High to Low":
      products.sort((a, b) => (parseInt(a.price) < parseInt(b.price)) ? 1 : ((parseInt(b.price) < parseInt(a.price)) ? -1 : 0));
      break;
    default:
      products.sort((a, b) => (convertDate(a.updatedAt) < convertDate(b.updatedAt)) ? 1 : ((convertDate(b.updatedAt) < convertDate(a.updatedAt)) ? -1 : 0));
  }

  // to show this while fetching data from database
  if (!products) return (<div>Loading...</div>);

  return (
    <div>
      {products && products.map(product => {
        return (
          <ProductCard key={product._id} product={product} />
        );
      })}

    </div>
  );
};

export default ProductList;