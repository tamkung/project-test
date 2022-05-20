import React from "react";
import { useState } from "react";
import { firebase, firebaseDB } from "../../services/firebase";

function SignUpAdmin() {
  const [value, setValue] = useState({
    email: "",
    password: "",
    confirm: "",
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
        .createUserWithEmailAndPassword(value.email, value.password)
        .then((userCredential) => {
          var user = userCredential.user;
          console.log(user);
          console.log(user.uid);
          console.log(user.email);
          firebaseDB
            .child("Admin")
            .child(user.uid)
            .set({
              email: user.email,
              uid: user.uid,
              type: "Admin",
            })
            .then(() => {
              alert("Add Admin success");
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error();
    }
  };

  return (
    <div className="container p-5" style={{minHeight:"850px" }}>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1>Register Page</h1>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Admin E-mail</label>
              <input
                className="form-control"
               
                type="email"
                name="email"
                onChange={handleChange}
              />
            </div>

            <div className="form-group mt-3">
              <label>Password</label>
              <input
                className="form-control"
                type="password"
                name="password"
                onChange={handleChange}
              />
              <label>Comfirm Password</label>
              <input
                className="form-control"
                type="password"
                name="confirm"
                onChange={handleChange}
              />
            </div>
            
            {/* <div className="form-group">
              <label>Confirm Password</label>
              <input
                className="form-control"
                type="password"
                name="password1"
                onChange={handleChange}
              />
            </div> */}

            <br />
            <button
              className="btn btn-success"
              disabled={value.password.length < 6 || value.password !== value.confirm || value.email === ""}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default SignUpAdmin;
