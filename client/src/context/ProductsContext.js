import React, { createContext, useEffect, useState } from 'react';
import apiCall from '../apis/axios';

export const ProductsContext = createContext({});

export const ProductsContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  // to fetch all products info
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiCall('/products/', 'get');
        setProducts(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
    // console.log('context');
  }, [setProducts]);

  // console.log(products);

  return (
    <ProductsContext.Provider
      value={{
        products,
        setProducts
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};