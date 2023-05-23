import React from "react";

const ProductPrice = (props) => {
  // show commas in thousands in currency
  let num = parseFloat(props.product.price);
  const price_amt = num.toLocaleString("en-us", {
    style: "currency",
    currency: "USD",
  });

  return (
    <span className="card-text fs-3">{price_amt}</span>
  );
};

export default ProductPrice;
