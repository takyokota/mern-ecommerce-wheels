import React, { Fragment, useEffect, useState } from "react";
import apiCall from "../apis/axios";
import Cookies from "js-cookie";
import Unauthorized from "../components/layouts/Unauthorized";
import { useNavigate } from "react-router-dom";
import ProductList from "../components/admin/ProductList";
import Header from "../components/layouts/Header";

const AdminProductPage = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const cookieToken = Cookies.get('token');
  const navigate = useNavigate();

  // to check if user is authorized to access this page
  useEffect(() => {
    const getUser = async () => {
      try {
        const foundUser = await apiCall(
          "/auth",
          "get",
          null,
          Cookies.get("token")
        ); foundUser.data.roles.includes(1001)
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

  // to navigate to add item
  const handleAdd = (e) => {
    e.preventDefault();

    navigate("/admin/products/add");
  };

  return (
    <Fragment>
      <Header />
      {isAuthorized ? (
        <div>
          <h1 className="text-center mb-5">Products Management</h1>
          <a href="/admin">&lt; Back To Admin Dashboard</a>
          <div className="d-flex flex-column">
            <div className="ms-auto">
              <button
                onClick={(e) => handleAdd(e)}
                className="btn btn-primary my-3"
              >
                Add a new product
              </button>
            </div>
            <div>
              <ProductList />
            </div>
          </div>
        </div>
      ) : (
        <Unauthorized />
      )}
    </Fragment>
  );
};

export default AdminProductPage;
