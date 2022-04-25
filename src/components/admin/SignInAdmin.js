//rafce
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { firebase } from "../../services/firebase";

function SignInAdmin() {
  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
    console.log(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(value.email, value.password)
        .then((userCredential) => {
          var user = userCredential.user;
          console.log(user);
          console.log(user.uid);
          console.log(user.email);
        }).catch((error)=>{
            console.error(error);
        });
      // +(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container p-5 ">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1>Login Page</h1>
          <hr />
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>E-Mail</label>
              <input
                className="form-control"
                type="text"
                name="email"
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                className="form-control"
                type="password"
                name="password"
                onChange={handleChange}
              />
            </div>
            <br />
            <button className="btn btn-success">
              Submit
            </button>
          </form>
          <div className="row mt-3">
            <p className="col-8 my-auto">
              No account? ,<Link to={"/admin/sing-up"}>Create one</Link>
            </p>
            <div className="col-4">
              <button className="btn btn-outline-danger btn-sm">
                Forgot Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInAdmin;
