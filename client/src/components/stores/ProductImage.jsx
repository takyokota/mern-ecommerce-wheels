import React from 'react';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';

const ProductImage = (props) => {
  const product = props.product;

  // Absolute path to access a image file in express js
  const picAddress = product?.image;
  const color = props.color;
  let picPath = '../image/no_image_available.jpg';
  if (picAddress && !color) {
    picPath = process.env.REACT_APP_SERVER_URL + '/public/img/' + Object.values(picAddress)[0];
  } else {
    picPath = process.env.REACT_APP_SERVER_URL + '/public/img/' + picAddress[color];
  }

  return (
    <div>
      <Link
        to={`/products/${product._id}`}>
        <Image
          className='image-main rounded-start'
          src={picPath}
          alt="Product"
          fluid
        />
      </Link>
    </div>
  );
};

export default ProductImage;