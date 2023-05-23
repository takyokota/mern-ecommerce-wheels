import React, { Fragment, useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import CartContext from "../../context/CartContext";
import apiCall from "../../apis/axios";
import ProductPrice from "./ProductPrice";

const CartDetail = (props) => {
  const cartProductId = props.id;
  const dbProductId = cartProductId.split(".")[0];
  const { dispatch } = useContext(CartContext);
  const [productInfo, setProductInfo] = useState({});
  const [currentProduct, setCurrentProduct] = useState({});

  // to get product info from database
  useEffect(() => {
    setCurrentProduct(props.product);
    const getProduct = async () => {
      try {
        const response = await apiCall('/products', "get");
        const filteredResult = response.data.filter(obj => obj._id === dbProductId);
        setProductInfo(filteredResult[0]);
      } catch (err) {
        console.log(err);
      }
    };

    getProduct();
  }, [dbProductId, props.product]);

  // to avoid that picAddress & picPath are undefined
  if (Object.keys(productInfo).length === 0 || Object.keys(currentProduct).length === 0) {
    return (<div></div>);
  }

  // Absolute path to access a image file in express js
  let picAddress = [];
  let picPath = "../../image/no_image_available.jpg";
  if (productInfo && currentProduct) {
    picAddress = productInfo?.image;
    picPath =
      process.env.REACT_APP_SERVER_URL + "/public/img/" + picAddress[currentProduct?.color];
  }

  // to add quantity
  const handleIncrement = (id, e) => {
    e.preventDefault();
    dispatch({
      type: "INCREASE",
      payload: { id },
    });
  };

  // to subtract quantity
  const handleDecrement = (id, e) => {
    e.preventDefault();

    dispatch({
      type: "DECREASE",
      payload: { id },
    });
  };

  // to remove the item
  const handleRemove = (id, e) => {
    e.preventDefault();

    dispatch({
      type: "REMOVE",
      payload: { id },
    });
  };

  return (
    <Fragment>
      <Container>
        <Row>
          <Col md={1}>
            {picAddress ? (
              <img
                alt="product"
                src={picPath}
                className="image-cart"
              />
            ) : (
              <img
                className="image-admin"
                src={require("../../image/no_image_available.jpg")}
                alt="Product"
              />
            )}
          </Col>
          <Col md={2} className="fw-bold">{productInfo.title}</Col>
          <Col md={3}>{productInfo.description}</Col>
          <Col md={1}>{currentProduct.color}</Col>
          <Col md={2}>
            <button onClick={(e) => handleIncrement(cartProductId, e)}>
              +
            </button>
            <span className="mx-3">{currentProduct.qty}</span>
            {currentProduct.qty > 1 ? (
              <button onClick={(e) => handleDecrement(cartProductId, e)}>
                -
              </button>
            ) : (
              <button disabled>-</button>
            )}
          </Col>
          <Col md={2}>
            <ProductPrice
              product={{ price: `${productInfo.price * currentProduct.qty}` }}
            // product={{ price: `${subtotal}` }}
            />
          </Col>
          <Col md={1}>
            <Button
              variant="danger"
              onClick={(e) => handleRemove(cartProductId, e)}
            >
              Remove
            </Button>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default CartDetail;
