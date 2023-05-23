import React, { Fragment, useEffect, useState } from "react";
import Nav from 'react-bootstrap/Nav';
import Header from "../components/layouts/Header";
import apiCall from "../apis/axios";
import Cookies from "js-cookie";
import Unauthorized from "../components/layouts/Unauthorized";

const AdminPage = () => {
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
          Cookies.get('token')
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
          <h1 className="text-center mb-5">Admin Page</h1>
          <Nav className="justify-content-around mt-3">
            <Nav.Item>
              <Nav.Link href="/admin/products">
                Products
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/admin">
                Users (under construction)
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/admin">
                Orders (under construction)
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <h2 className="text-center mt-5">Dashboard (under construction)</h2>
        </div>
      ) : (
        <Unauthorized />
      )}
    </Fragment>
  );
};

export default AdminPage;
