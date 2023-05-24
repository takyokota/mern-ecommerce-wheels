import React, { useContext, useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Header from '../components/layouts/Header';
import ProductList from '../components/stores/ProductList';
import apiCall from '../apis/axios';
import { ProductsContext } from '../context/ProductsContext';

const ProductPage = () => {
  const { setProducts } = useContext(ProductsContext);
  const [sortBy, setSortBy] = useState("Newest");
  const [loading, setLoading] = useState(true);

  // to fetch all products info
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiCall('/products/', 'get');
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
    // console.log('context');
  }, [setProducts]);

  return (
    <div>
      <Header />
      <h1 className='text-center'>Products</h1>
      <div className='position-relative mb-3'>
        <div className='position-abusolute end-0'>
          <span>Sort By: </span>
          <DropdownButton
            variant='outline-primary'
            align="end"
            id="dropdown-item-button"
            title={sortBy}>
            <Dropdown.Item onClick={() => setSortBy("Newest")}>Newest</Dropdown.Item>
            <Dropdown.Item onClick={() => setSortBy("Oldest")}>Oldest</Dropdown.Item>
            <Dropdown.Item onClick={() => setSortBy("Price Low to High")}>Price Low to High</Dropdown.Item>
            <Dropdown.Item onClick={() => setSortBy("Price High to Low")}>Price High to Low</Dropdown.Item>
          </DropdownButton>
        </div>
      </div>
      {loading ? (
        <div className='text-center mt-5 fs-3'>Loading...</div>
      ) : (
        <ProductList sortBy={sortBy} />
      )}
    </div>
  );
};

export default ProductPage;