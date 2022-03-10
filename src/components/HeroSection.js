import React from 'react';
import '../App.css';
import { Button } from './Button';
import { ButtonCol } from './Button-Collect';
import './HeroSection.css';
import Login from './pages/Login';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
function HeroSection() {
  

  return (
    <div className='hero-container'>
      <h1>Thesis Collection</h1>
      <p>For KMUTNB Students</p>
     <img src='/images/bg-home.jpg' />
      
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          onClick={Login}
        >
          เข้าสู่ระบบ
        </Button>

        <ButtonCol
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
          to='#'
        
        >
          ผลงานปริญญานิพนธ์
        </ButtonCol>
      </div>
    </div>
  );
}

export default HeroSection;
