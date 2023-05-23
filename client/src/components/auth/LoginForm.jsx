import React, { Fragment, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import apiCall from "../../apis/axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { schema } from "./loginSchema";
import AuthContext from '../../context/AuthContext';
import "../style.css";
import CartContext from "../../context/CartContext";

const LOGIN_URL = "/auth";

const LoginForm = () => {
  const { setAuth } = useContext(AuthContext);
  const { totalQty } = useContext(CartContext);
  const navigate = useNavigate();

  // form validation
  const {
    register,
    setFocus,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // to focus on 'username' input field when page loaded
  useEffect(() => {
    setFocus('username');
  }, [setFocus]);

  // form submittion
  const submitForm = async (data, e) => {
    e.preventDefault();

    const username = data.username;
    const password = data.password;

    try {
      const response = await apiCall(LOGIN_URL, "post", { username, password });

      // const roles = response?.data?.roles;
      const accessToken = response?.data?.accessToken;
      // setAuth({ username, password, roles, accessToken });
      // setAuth({ accessToken });

      // to set an access token in cookies
      Cookies.set("token", accessToken, {
        sameSite: 'none',
        secure: true
      });
      setAuth(true);

      // to select a link to, whether cart is empty
      if (totalQty > 0) {
        navigate("/cart");
      } else {
        // TODO: change to Order page
        navigate("/products");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Fragment>
      <h1 className="text-center">Login</h1>
      <p className="text-center">* Required field</p>
      <Form className="login-form" onSubmit={handleSubmit(submitForm)}>
        <Form.Group>
          <Form.Label>Username*</Form.Label>
          <Form.Control
            {...register("username")}
            placeholder="Enter username"
            type="text"
          />
          <span style={{ color: "red" }}>{errors.username?.message}</span>
        </Form.Group>
        <Form.Group className='mt-3'>
          <Form.Label>Password*</Form.Label>
          <Form.Control
            {...register("password")}
            placeholder="Enter password"
            type="password"
          />
          <span style={{ color: "red" }}>{errors.password?.message}</span>
        </Form.Group>

        <Button className="my-5" type="submit" variant="primary">
          SIGN IN
        </Button>
      </Form>
    </Fragment>
  );
};

export default LoginForm;
