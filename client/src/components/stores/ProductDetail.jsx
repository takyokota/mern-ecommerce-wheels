import React, { Fragment, useContext, useState } from 'react';
import ProductImage from './ProductImage';
import ProductPrice from './ProductPrice';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { ProductsContext } from '../../context/ProductsContext';
import CartContext from '../../context/CartContext';

const ProductDetail = (props) => {
  const { products } = useContext(ProductsContext);
  const { dispatch } = useContext(CartContext);
  const [color, setColor] = useState('Blue');

  // get data matched the selected id
  const result = products.filter(product => product._id === props.id);
  const matchedProduct = result[0];

  // to avoid 'data is undefined' error
  if (!matchedProduct) return (<div>Loading...</div>);

  // to add the item to a cart
  const handleAdd = () => dispatch({
    type: 'ADD',
    payload: {
      id: `${matchedProduct._id}.${color}`,
      color: color,
      qty: 1
    }
  });

  return (
    <Fragment>
      <div className="d-flex flex-sm-row flex-column justify-content-around mt-5">
        <div>
          <ProductImage product={matchedProduct} color={color} />
        </div>
        <div>
          <h1>{matchedProduct.title}</h1>
          <h3>{matchedProduct.description}</h3>
          <p className='mt-5'>Choose color:</p>
          <ButtonGroup className='mb-5'>
            {matchedProduct.color.map((item) => (
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
            <ProductPrice product={matchedProduct} />
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