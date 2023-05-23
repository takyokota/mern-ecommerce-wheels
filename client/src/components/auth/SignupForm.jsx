import React, { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import apiCall from "../../apis/axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { schema } from "./loginSchema";
import AuthContext from '../../context/AuthContext';
import CartContext from "../../context/CartContext";
import "../style.css";

const SIGNUP_URL = "/register";
const LOGIN_URL = "/auth";

const SignupForm = () => {
  const { setAuth } = useContext(AuthContext);
  const { totalQty } = useContext(CartContext);
  const navigate = useNavigate();
  const [msg, setMsg] = useState(null);

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
      const newUser = await apiCall(SIGNUP_URL, "post", { username, password });
      // console.log(newUser);

      // to automatically log in if signup successed
      if (newUser.status === 201) {
        try {
          const loginInfo = await apiCall(LOGIN_URL, "post", { username, password });

          const accessToken = loginInfo?.data?.accessToken;

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
      }
    } catch (err) {
      console.log(err);
      if (err.response.status === 409) {
        setMsg('The username is already taken.');
      }
    }
  };

  return (
    <Fragment>
      <h1 className="text-center">Sign Up</h1>
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
          {msg ? (<span style={{ color: "red" }}>{msg}</span>) : <></>}
        </Form.Group>
        <Form.Group className="my-3">
          <Form.Label>Password*</Form.Label>
          <Form.Control
            {...register("password")}
            placeholder="Enter password"
            type="password"
          />
          <span style={{ color: "red" }}>{errors.password?.message}</span>
        </Form.Group>
        <Form.Group>
          <Form.Label>Confirm Password*</Form.Label>
          <Form.Control
            {...register("confirmPassword")}
            placeholder="Enter password"
            type="password"
          />
          <span style={{ color: "red" }}>{errors.confirmPassword?.message}</span>
        </Form.Group>

        <Button className="my-5" type="submit" variant="primary">
          SUBMIT
        </Button>
      </Form>
    </Fragment>
  );
};

export default SignupForm;