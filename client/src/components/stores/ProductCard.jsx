import React from "react";
import { Link } from "react-router-dom";
import ProductImage from "./ProductImage";
import ProductPrice from "./ProductPrice";

const ProductCard = (props) => {
  const product = props.product;

  return (
    <div
      className="card border-light hover-shadow mb-5"
      style={{ width: "100%" }}
    >
      <div className="row g-0">
        <div className="col-md-5">
          <ProductImage product={product} url={`/products/${product._id}`} />
        </div>

        <div className="col-md-7">
          <div
            className="card-body d-flex flex-column justify-content-between"
            style={{ height: "100%" }}
          >
            <div>
              <Link to={`/products/${product._id}`}>
                <h3 className="card-title display-6">{product.title}</h3>
              </Link>
              <p className="card-text my-3 fs-4">{product.description}</p>
            </div>
            <div className="mb-4">
              <div className="row">
                <div className="col-5"></div>
                <div className="col-6 d-flex justify-content-between">
                  <ProductPrice product={product} />
                </div>
                <div className="col-1"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
