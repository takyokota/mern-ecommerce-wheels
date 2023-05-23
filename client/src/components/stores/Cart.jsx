import React, { Fragment, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import CartContext from "../../context/CartContext";
import CartDetail from "./CartDetail";
import ProductPrice from "./ProductPrice";
import { ProductsContext } from "../../context/ProductsContext";

const Cart = (props) => {
  const { state, dispatch, totalQty } = useContext(CartContext);
  const { products } = useContext(ProductsContext);

  const navigate = useNavigate();
  const user = props.user;
  let cartTotalAmt = 0;

  // to calculate the total amount
  products.forEach((product) => {
    state.forEach((cartProduct) => {
      if (product._id === cartProduct.id.split(".")[0]) {
        cartTotalAmt += product.price * cartProduct.qty;
      }
    });
  });

  // to place an order
  const handleOrder = (e) => {
    e.preventDefault();

    // TODO: save order info into Order database

    // only for testing purpose. to empty all in a cart after placing an order
    dispatch({
      type: "DELETE",
    });

    navigate("/");
  };

  return (
    <Fragment>
      <h2 className="my-5">{user}'s Order</h2>
      {totalQty !== 0 ? (
        <div>
          {state.map((product) => (
            <div className="mt-5" key={product.id}>
              <CartDetail id={product.id} product={product} />
              <hr />
            </div>
          ))}
          <div className="text-end my-5">
            <span>
              <span className="fs-4">Total: &nbsp;</span>
              <ProductPrice className='ml-3' product={{ price: `${cartTotalAmt}` }} />
            </span>
          </div>
          <div className="text-center">
            <p>Payment: (Under Construction)</p>
            <p>
              *** Please click 'Place Your Order' for testing. It won't place an
              actual order. ***
            </p>
          </div>
          <div className="position-relative">
            <Button
              variant="warning"
              size="lg"
              className="position-absolute end-0 my-5"
              onClick={(e) => handleOrder(e)}
            >
              Place Your Order
            </Button>
          </div>
        </div>
      ) : (
        <p className="text-center fs-2">Your cart is empty</p>
      )}
    </Fragment>
  );
};

export default Cart;
