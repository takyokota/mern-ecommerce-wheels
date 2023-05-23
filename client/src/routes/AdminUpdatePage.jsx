import React, { Fragment, useEffect, useState } from "react";
import Header from "../components/layouts/Header";
import apiCall from "../apis/axios";
import Cookies from "js-cookie";
import Unauthorized from "../components/layouts/Unauthorized";
import UpdateProduct from '../components/admin/UpdateProduct';

const UpdatePage = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const cookieToken = Cookies.get('token');

  // to check if user is authorized to access this page
  useEffect(() => {
    const getUser = async () => {
      try {
        const foundUser = await apiCall(
          "/auth",
          "get",
          null,
          Cookies.get("token")
        );
        foundUser.data.roles.includes(1001)
          ? setIsAuthorized(true)
          : setIsAuthorized(false);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    getUser();
  }, []);

  // to avoid showing Unauthorized message while fetching data
  if (loading && cookieToken) {
    return (<div></div>);
  }

  return (
    <Fragment>
      <Header />
      {isAuthorized ? (
        <div>
          <div className='text-center my-3'>
            <h1>Update a Product</h1>
          </div>
          <UpdateProduct />
        </div>
      ) : (
        <Unauthorized />
      )}
    </Fragment>
  );
};

export default UpdatePage;