import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Header from '../components/layouts/Header';
import ProductList from '../components/stores/ProductList';

const Home = () => {
  // TODO: change this page to main page and put a link to Product Page

  const [sortBy, setSortBy] = useState("Newest");

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
      <ProductList sortBy={sortBy} />
    </div>
  );
};

export default Home;