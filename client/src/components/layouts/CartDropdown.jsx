import React, { Fragment, useContext } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Cookies from 'js-cookie';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CartContext from '../../context/CartContext';
import '../style.css';

const CartDropdown = () => {
  const { totalQty, dispatch } = useContext(CartContext);
  const token = Cookies.get('token');

  // to empty all in a cart
  const handleRemove = () => dispatch({
    type: 'EMPTY'
  });

  return (
    <Fragment>
      <Dropdown>
        <Dropdown.Toggle>
          <ShoppingCartIcon />
          {totalQty === 0 ? (<span> </span>) : (
            <span className="badge" id='CartCount'>{totalQty}</span>
          )}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {token
            ? <Dropdown.Item href='/cart'>CHECKOUT</Dropdown.Item>
            : <Dropdown.Item href='/login'>CHECKOUT</Dropdown.Item>}

          <Dropdown.Item onClick={handleRemove}>Empty Your Cart</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Fragment>
  );
};

export default CartDropdown;