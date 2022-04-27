import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../css/App.css';
import '../css/HeroSection.css';
import '../css/Navbar.css';
import { firebaseDB, firebase } from "../services/firebase";

import { Dropdown } from 'react-bootstrap';
function HeroSection() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);
  
  console.log(user);
  
  return (
    <div className='hero-container'>
      <h2></h2>
      

      <p>For KMUTNB Students</p>
      <img className="home-img" src='/images/bg-home.jpg' alt='not images' />
    </div>
  );
}

export default HeroSection;
