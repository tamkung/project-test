import React from 'react';
import { auth } from '../../services/firebase';
import '../../css/App.css';

const Logout = ({ user }) => {
  return (
    <div>
      <button className="button" onClick={() => auth.signOut()}>Sign out</button>
    </div>
  )
}

export default Logout;