import React from "react";
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";

// ------@Data Base-------
import { firebase, firebaseDB } from "../src/services/firebase";

// ----------@Layout------
// import Navbar from "./components/Navbar";
import Navbar from "./components/layout/Navbar";
import NavbarAdmin from './components/layout/AdminNavbar'
import Footer from './components/layout/Footer';

// ----------@Css---------
import "../src/css/App.css";
import "../src/css/admin.css";
// ----------@Pages--------
import Home from "./components/pages/Home";
import NotFound from "./error_404";

// ------------------------------------------user
import Report from "./components/pages/Report";
import ViewThesis from "./components/user/ViewThesis";
import ListThesis from "./components/user/ListThesis";
import MyThesis from "./components/user/MyThesis";
import WebType from "./components/user/WebType";
// ------------------------------------------admin

import AdminReport from "./components/admin/AdminReport";
import AdminThesis from "./components/admin/AdminThesis";
import AdminList from "./components/admin/AdminList";
import AdminAddThesis from "./components/admin/AddThesis";
import AdminEditThesis from "./components/admin/EditThesis";
import SignInAdmin from "./components/admin/SignInAdmin";
import SignUpAdmin from "./components/admin/SignUpAdmin";
import AdminHome from "./components/admin/HomeAdmin";

import Login from "./components/pages/Login";
import "./css/style.css";

import Logout from "./components/pages/Logout";

function App() {
  const [user, setUser] = useState(null);
  const [admin, setAdmmin] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((users) => {
      setUser(users);
      if (users !== null) {
        firebaseDB
          .child("Admin")
          .orderByChild("uid")
          .equalTo(users.uid.toString())
          .on("value", (snapshot) => {
            if (snapshot.val() !== null) {
              setAdmmin(true);
            } else {
              setAdmmin(false);
            }
          });
      } else {
        setUser({});
      }
    });
  }, []);


  return (
    <div >
      {admin ? (
        <div>
          {/* <------------------------ Pages Admin ------------------------> */}
          {/* <h1> Admin</h1> */}
          {/* <Navbar /> */}
          <NavbarAdmin />
          <Routes>
            <Route path={"/"} index element={<AdminHome />} />
            <Route path={"/ListThesis"} element={<ListThesis />} />
            <Route path={"/login"} element={<Login />} />
            <Route path={"/MyThesis"} element={<MyThesis />} />
            <Route path={"/viewcollection/:id"} element={<ViewThesis />} />
            <Route path={"/report"} element={<Report />} />

            <Route path={"/admin/sign-in"} element={<SignInAdmin />} />
            <Route path={"/admin/sign-up"} element={<SignUpAdmin />} />
            <Route path={"/adminreport"} element={<AdminReport />} />
            <Route path={"/adminlist"} element={<AdminList />} />
            <Route path={"/EditThesis/:id"} element={<AdminEditThesis />} />
            <Route path={"/AddCollection"} element={<AdminAddThesis />} />
            <Route path={"/admin-add"} element={<AdminThesis />} />

            {/* <------------------------Pages GATHER------------------------> */}
            <Route path={"*"} element={<NotFound />} />
          </Routes>
          
            <Logout style={{ fontSize: "150%" }} />
         
        </div>
      ) : (
        <div >
          {/* <------------------------ Pages User ------------------------> */}
          {/* <h1>Not Admin</h1> */}
          <Navbar />
          <Routes >
            <Route path={"/"} index element={<Home />} />
            <Route path={"/ListThesis"} element={<ListThesis />} />
            <Route path={"/login"} element={<Login />} />
            <Route path={"/MyThesis"} element={<MyThesis />} />
            <Route path={"/webtype"} element={<WebType />} />
            <Route path={"/viewcollection/:id"} element={<ViewThesis />} />
            <Route path={"/report"} element={<Report />} />

            <Route path={"/admin/sign-in"} element={<SignInAdmin />} />
            <Route path={"/admin/sign-up"} element={<SignUpAdmin />} />
            <Route path={"/adminreport"} element={<AdminReport />} />
            <Route path={"/adminlist"} element={<AdminList />} />
            <Route path={"/EditThesis/:id"} element={<AdminEditThesis />} />
            <Route path={"/AddCollection"} element={<AdminAddThesis />} />
            <Route path={"/admin-add"} element={<AdminThesis />} />

            {/* <------------------------Pages GATHER------------------------> */}
            <Route path={"*"} element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      )}
    </div>
  );
}

export default App;
