import React from "react";
import { auth } from "../../services/firebase";
import "../../css/App.css";
const Logout = ({ user }) => {
  return (
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
        Sign out
      </button>
    </div>
  );
};

export default Logout;
