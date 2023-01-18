import '../../css/App.css';
import HeroSection from '../layout/HeroSection';
import React, { useState, useEffect } from "react";
import { firebase } from "../../services/firebase";
function Home() {
  const [user, setUser] = useState({});
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);
  return (
    <div>
      <HeroSection />
    </div>
  );
}
export default Home;