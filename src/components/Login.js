import React from "react";
import { Button } from "@material-ui/core";
import { auth, provider } from "../firebase";

import "../styles/Login.css";

const Login = () => {
  const logIn = () => {
    auth.signInWithPopup(provider).catch((error) => alert(error.message));
  };
  return (
    <div className='login'>
      <div className='login__logo'>
        <img
          src='https://jurby.sch.im/site/uploads/blog/16/image/1200px_Microsoft_Office_Teams_2018_present_svg.png'
          alt='Microsoft Teams'
        />
      </div>
      <Button onClick={logIn}>Login to Microsoft Teams</Button>
    </div>
  );
};

export default Login;
