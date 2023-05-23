import React, { Fragment } from 'react';
import Button from 'react-bootstrap/Button';
// import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <Fragment>
      <div className="d-flex flex-column align-items-center pt-5">
        <i className="fas fa-ban security-icon"></i>
        <p className="mt-3">You are not authorized to access this page</p>
      </div>
      <div className='position-relative'>
        <Button
          className='primary position-absolute top-50 start-50 translate-middle mt-5'
          href="/"
        >
          Go Back
        </Button>
      </div>
    </Fragment>
  );
};

export default Unauthorized;