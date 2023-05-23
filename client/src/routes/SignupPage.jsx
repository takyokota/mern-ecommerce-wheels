import React, { Fragment } from "react";
import Header from "../components/layouts/Header";
import SignupForm from "../components/auth/SignupForm";

const SignupPage = () => {
  return (
    <Fragment>
      <Header />
      <SignupForm />
      <div className="text-center">
        <p>Already have an account? <a className="text-primary" href="/login">LOGIN</a></p>
      </div>
    </Fragment>
  );
};

export default SignupPage;