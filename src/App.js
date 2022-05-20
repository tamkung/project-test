import React from "react";
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";

// ------@Data Base-------
import { firebase, firebaseDB } from "../src/services/firebase";

// ----------@Layout------
import Navbar from "./components/layout/Navbar";
import NavbarAdmin from "./components/layout/AdminNavbar";
import Footer from "./components/layout/Footer";
import Spinner from "react-bootstrap/Spinner";
import CheckLogin from './components/user/CheckLogin';
// ----------@Css---------
import "../src/css/App.css";
import "../src/css/admin.css";
import "./css/style.css";
// ----------@Pages--------
import { RouterAdmin } from "./Routes/RoutesAdmin";
import { RouterNoLogin } from "./Routes/RoutesNoLogin";
import { RouterUser } from "./Routes/RoutesUser";


function App() {
  const [admin, setAdmmin] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((users) => {
      if (users !== null) {
        firebaseDB
          .child("Admin")
          .orderByChild("uid")
          .equalTo(users.uid.toString())
          .on("value", (snapshot) => {
            if (snapshot.val() !== null) {
              setAdmmin("admin");
            } else {
              setAdmmin("user");
            }
          });
      } else {
        setAdmmin("NoLogin");
      }
    });
  }, []);

  return (
    <div>
      {admin == "admin" ? (
        <div>
          {/* <------------------------------------------------ Pages Admin ------------------------------------------------> */}
          <NavbarAdmin style={{height:"50px" }} />
          <Routes>
            {RouterAdmin.map(({ path, element }, key) => {
              return <Route index path={path} element={element} key={key} />
            })}
          </Routes>
        </div>
      ) : admin == "user" ? (

        <div>
          {/* <------------------------------------------------ Pages User ------------------------------------------------> */}
          <CheckLogin />
          <Navbar />

          <Routes>

            {RouterUser.map(({ path, element }, key) => {
              return <Route index path={path} element={element} key={key} />
            })}
          </Routes>
          <Footer />
        </div>
      ) : admin == "NoLogin" ? (
        <div>
          {/* <------------------------------------------------ Pages NoLogin ------------------------------------------------> */}
          <Navbar />
          <Routes>
            {RouterNoLogin.map(({ path, element }, key) => {
              return <Route index path={path} element={element} key={key} />
            })}
          </Routes>
          <Footer />
        </div>
      ) : (
        <div className="wait-spinner">

          <Spinner animation="border" variant="success" />
        </div>
      )}
    </div>
  );
}

export default App;
