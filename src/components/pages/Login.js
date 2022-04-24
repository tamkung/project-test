import { signInWithGoogle } from "../../services/firebase";
import React from "react";
import "../../css/App.css";

const Login = () => {
  return (
    <div>
      <button className="button" onClick={signInWithGoogle}><i className="fab fa-google"></i>Sign in with google</button>
    </div>
  );
};
export default Login;
