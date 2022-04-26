import React from 'react';
import '../css/App.css';
import '../css/HeroSection.css';

function HeroSection() {
  return (
    <div className='hero-container'>
      <h1>Thesis Collection</h1>
      <p>For KMUTNB Students</p>
      <img className="home-img" src='/images/bg-home.jpg' alt='not images' />
    </div>
  );
}

export default HeroSection;
