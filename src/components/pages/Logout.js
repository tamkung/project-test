import React from "react";
import { auth } from "../../services/firebase";
import "../../css/App.css";
import { Link } from "react-router-dom";
import * as FcIcons from "react-icons/fc";
const Logout = ({ user }) => {
  return (
    // <div>
    //   <button className="button" onClick={() => auth.signOut()}>Sign out</button>
    // </div>
    <div>
      <button
        className="btn btn-outline-danger auth-out-btn"
        onClick={() =>
          auth
            .signOut()
            .then(() => {
              window.location.href = "/";
            })
            .catch((error) => {
              console.error(error);
            })
        }
        style={{ fontSize: "18px", margin: "10px" }}
      >
        {/* <FcIcons.FcGoogle style={{ fontSize: "150%" }} /> &nbsp; &nbsp; |
        &nbsp;&nbsp; Sign out */}Sign out
      </button>
    </div>
  );
};

export default Logout;
