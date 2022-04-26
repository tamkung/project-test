import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';
import Login from './pages/Login';
import { firebase, firebaseDB } from '../services/firebase';
import Logout from './pages/Logout';
import GoogleLogin from 'react-google-login';

function Navbar() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setUser(user);
    })
  }, [])

  console.log(user);

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

  window.addEventListener('resize', showButton);

  const AddUser = () => {
    firebaseDB.child('User').child(user.uId)

  }

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            THESIS
          </Link>
          <div className='menu-icon' onClick={handleClick} >
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />

          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/ListThesis'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Collection
              </Link>
            </li>

            <li className='nav-item'>
              <Link
                to='/report'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Report
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='#' className='nav-links' style={{border:"0"}} onClick={closeMobileMenu} >
                {/* <Login/> */}
                {user ? <Logout user={user} /> : <Login />}

              </Link>
            </li>
            {/* <li>
             <h5>{user.DisplayName}</h5>
            </li> */}
            


          </ul>
        </div>

      </nav>

    </>
  );
}

export default Navbar;
