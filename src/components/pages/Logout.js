import React from 'react';
import { auth } from '../../services/firebase';
import '../../css/App.css';
import { Link } from "react-router-dom";
import * as FcIcons from 'react-icons/fc'
const Logout = ({ user }) => {
  return (
    // <div>
    //   <button className="button" onClick={() => auth.signOut()}>Sign out</button>
    // </div>
    <div className="btn" >
    <button className="auth-btn" onClick={() => auth.signOut()} style={{fontSize: "100%", margin: "10px"}}>
      <FcIcons.FcGoogle style={{ fontSize: "150%" }} /> &nbsp; &nbsp;
     | &nbsp;&nbsp; Sign out
    
    </button>
  </div>
  )
}

export default Logout;