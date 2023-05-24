import React, { Fragment, useContext, useEffect, useState } from 'react';
import ProductImage from './ProductImage';
import ProductPrice from './ProductPrice';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import CartContext from '../../context/CartContext';
import apiCall from '../../apis/axios';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const { dispatch } = useContext(CartContext);
  const [color, setColor] = useState('Blue');
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  // to fetch all products info
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiCall(`/products/${id}`, 'get');
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
    // console.log('context');
  }, [id, setProduct]);

  // to avoid 'data is undefined' error
  if (loading) return (<div className='text-center mt-5 fs-3'>Loading...</div>);

  // to add the item to a cart
  const handleAdd = () => dispatch({
    type: 'ADD',
    payload: {
      id: `${product._id}.${color}`,
      color: color,
      qty: 1
    }
  });

  return (
    <Fragment>
      <div className="d-flex flex-sm-row flex-column justify-content-around mt-5">
        <div>
          <ProductImage product={product} color={color} />
        </div>
        <div>
          <h1>{product.title}</h1>
          <h3>{product.description}</h3>
          <p className='mt-5'>Choose color:</p>
          <ButtonGroup className='mb-5'>
            {product.color.map((item) => (
              <ToggleButton
                key={item}
                type='radio'
                name='color'
                variant={
                  item === 'Blue'
                    ? 'outline-primary'
                    : item === 'Green'
                      ? 'outline-success'
                      : item === 'Orange'
                        ? 'outline-warning'
                        : 'outline-danger'
                }
                checked={color === item}
                onClick={() => setColor(item)}
              >
                {item}
              </ToggleButton>
            ))}
          </ButtonGroup>

          <div className="text-end">
            <ProductPrice product={product} />
          </div>
          <div className='d-grid px-3 mt-3'>
            <Button
              onClick={handleAdd}
              variant='danger'
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>

    </Fragment>
  );
};

export default ProductDetail;