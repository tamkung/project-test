import React, { useEffect, useState } from "react";
import '../../css/App.css';
import '../../css/HeroSection.css';
import '../../css/Navbar.css';
import { firebase } from "../../services/firebase";

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
      <h1>Thesis Collection</h1>
      

      <p>For KMUTNB Students</p>
      <img className="home-img" src='/images/bg-home.jpg' alt='not images' />
    </div>
  );
}

export default HeroSection;
