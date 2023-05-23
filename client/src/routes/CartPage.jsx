import React, { Fragment, useEffect, useState } from "react";
import Cookies from "js-cookie";
import Header from "../components/layouts/Header";
import Cart from "../components/stores/Cart";
import apiCall from "../apis/axios";
import Unauthorized from "../components/layouts/Unauthorized";

const CartPage = () => {
  const [user, setUser] = useState(null);
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
          Cookies.get('token')
        );
        setUser(foundUser.data.username);
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
      {user ? (
        <div>
          <h1 className="text-center mb-5">Your Cart</h1>
          <a href="/products">&lt; Continue Shopping</a>
          <Cart user={user} />
        </div>
      ) : (
        <Unauthorized />
      )}
    </Fragment>
  );
};

export default CartPage;
