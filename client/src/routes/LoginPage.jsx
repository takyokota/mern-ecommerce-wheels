import React, { Fragment } from "react";
import Header from "../components/layouts/Header";
import LoginForm from "../components/auth/LoginForm";

const LoginPage = () => {
  return (
    <Fragment>
      <Header />
      <LoginForm />
      <div className="text-center">
        <p>Don't have an account? <a className="text-primary" href="/signup">CREATE ACCOUNT</a></p>
      </div>
    </Fragment>
  );
};

export default LoginPage;
