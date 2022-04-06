import React from 'react';
import '../../css/App.css';
import HeroSection from '../HeroSection';
// import Cards from '../Cards';
import Footer from '../Footer';
// import { Route, Switch } from 'react-router-dom';
function Home(user) {
  return (
    <>
    
      <HeroSection />
      {/* <Cards /> */}
      <Footer />
    </>
  );
}

export default Home;
