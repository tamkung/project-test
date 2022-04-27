import { signInWithGoogle } from "../../services/firebase";
import React from "react";
import "../../css/App.css";
import { Link } from "react-router-dom";
import * as FcIcons from 'react-icons/fc'
const Login = () => {
  return (
    <div className="btn" >
      <button className="btn auth-btn" onClick={signInWithGoogle} style={{fontSize: "16px"}}>
        <FcIcons.FcGoogle style={{ fontSize: "150%" }} /> &nbsp; &nbsp;
       | &nbsp;&nbsp; Sign In With Google
      
      </button>
    </div>


  );
};
export default Login;
