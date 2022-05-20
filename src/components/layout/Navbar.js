import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../css/Navbar.css";
import Login from "../pages/Login";
import { firebase, firebaseDB } from "../../services/firebase";
import { Dropdown } from "react-bootstrap";
import { auth } from "../../services/firebase";
import * as BsIcons from 'react-icons/bs';


function Navbar() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      
      setUser(user);
    });
  }, []);
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
      // button
    } else {
      setButton(true);
    }
  };
  useEffect(() => {
    showButton();
  }, []);
  window.addEventListener("resize", showButton);
  const AddUser = () => {
    firebaseDB.child("User").child(user.uId);
  };
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}> THESIS</Link>
          <div className="menu-icon" onClick={handleClick}><i className={click ? "fas fa-times" : "fas fa-bars"} /> </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>Home</Link>
            </li>
            <li className="nav-item"><Link to="/ListThesis" className="nav-links" onClick={closeMobileMenu}> Collection </Link></li>
            {user ? (
              <>
                <li className="nav-item">
                  <Link to="/report" className="nav-links" onClick={closeMobileMenu}>
                    Report
                  </Link>
                </li>
                <Dropdown>
                  <Dropdown.Toggle className="nav-links" variant="transprent">
                    <img src={user.photoURL} alt={<BsIcons.BsFillPersonFill />} style={{ borderRadius: "50%", width: "40px", margin: "0px 20px 0px 0px", }} /> {user.displayName}
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="drop-nav" style={{ width: "100%", alignItems: "center" }} >
                    <Dropdown.Item className="btn" style={{ textAlign: "center" }}>
                      <Link to="/mythesis" className="btn"> My Thesis </Link>
                    </Dropdown.Item>
                    <Dropdown.Item className="btn" style={{ textAlign: "center" }}>
                      <Link to="/" className="btn" onClick={() => auth.signOut().then(() => { window.location.href = "/"; }).catch((error) => { console.error(error); })}>
                        Log out
                      </Link>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (<li style={{ margin: "5% 0% 5% 0%", padding: "0" }}> <Login className="nav-links" variant="transprent" /> </li>)}
          </ul>
        </div>
      </nav>
    </div>
  );}
export default Navbar;