import React, { useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
export default function Login() {
    const clientId = "209491001449-c1odam4p4vi99gdjmbkp86r1n6ekjm53.apps.googleusercontent.com";
    const [showLoginButton, setShowLoginButton] = useState(true);
    const [showLogoutButton, setShowLogoutButton] = useState(false);

    const onLoginSuccess = (res) => {
        console.log('Login Success', res.profileObj);
        setShowLoginButton(false);
        setShowLogoutButton(true);
    }

    const onFailureSuccess = (res) => {
        console.log('Login Failed', res);

    }

    const onSignoutSuccess = (res) => {
        alert("You have been signed out out successfully")
        setShowLoginButton(true);
        setShowLogoutButton(false);
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

                >
                </GoogleLogout> : null
            }

        </div>
        
    )
}
