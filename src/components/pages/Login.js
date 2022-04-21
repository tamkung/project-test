import userEvent from '@testing-library/user-event';
import React, { useEffect, useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

function Login() {
    const clientId = "209491001449-c1odam4p4vi99gdjmbkp86r1n6ekjm53.apps.googleusercontent.com";
    const [showLoginButton, setShowLoginButton] = useState(true);
    const [showLogoutButton, setShowLogoutButton] = useState(false);
    const [showProfile, setshowProfile] = useState(true);

    const onLoginSuccess = (res) => {
        console.log('Login Success', res.profileObj);
        // console.log('email',res.googleId);
        setShowLoginButton(false);
        setShowLogoutButton(true);
        setshowProfile(false);

    }

    const onFailureSuccess = (res) => {
        console.log('Login Failed', res);

    }

    const onSignoutSuccess = (res) => {
        alert("ออกจากระบบเรียบร้อย")
        setShowLoginButton(true);
        setShowLogoutButton(false);
        setshowProfile(false);
    }
    return (
        <div>
            {showLoginButton ?

                <GoogleLogin
                    clientId={clientId}
                    buttonText=" Sign In With Google "
                    onSuccess={onLoginSuccess}
                    
                    onFailure={onFailureSuccess}
                    cookiePolicy={'single_host_origin'}
                /> : null
            }

            {showLogoutButton ?

                <GoogleLogout
                    clientId={clientId}
                    buttonText="Logout"
                    onLogoutSuccess={onSignoutSuccess}

                />
                : null
            }

        </div>

    )
}
export default Login;