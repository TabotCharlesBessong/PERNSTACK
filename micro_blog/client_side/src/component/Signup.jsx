import React from "react";
import { SignupStyled } from "../styled";
import { SignupButton } from "../styled/Signup.styled";

const Signup = () => {

  const handleSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <SignupStyled>
      <form onSubmit={handleSubmit} action="">
        <div>
          <h1>Social Media</h1>
          <sub>Created by Charles Tabot</sub>
        </div>
        <SignupButton>
          Sign in with google <i className="fa-brands fa-google" />
        </SignupButton>
      </form>
    </SignupStyled>
  );
};

export default Signup;
