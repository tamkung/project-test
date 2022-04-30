import React from "react";
import "../../css/Footer.css";
// import { Button } from './Button';
import { Link } from "react-router-dom";
import * as MdIcons from "react-icons/md"
function Footer() {

  return (

    <div className="footer-container">
      <div className="footer-logo">
        <Link to="/" className="btn" style={{color:"white"}}>
          - Thesis -
        </Link>
      </div>
      <small>
        <div className="social-icons">
          <Link className="btn btn-outline-light circle" to="/admin/sign-in" onClick={'/'}>
            <MdIcons.MdAdminPanelSettings size={30} />
          </Link>
          <Link className="btn btn-outline-light circle" to="/admin/sign-in" onClick={'/'}>
            <MdIcons.MdAdminPanelSettings size={30} />
          </Link>
          <Link className="btn btn-outline-light circle" to="/admin/sign-in" onClick={'/'}>
            <MdIcons.MdAdminPanelSettings size={30} />
          </Link>
          <Link className="btn btn-outline-light circle" to="/admin/sign-in" onClick={'/'}>
            <MdIcons.MdAdminPanelSettings size={30} />
          </Link>
        </div>
      </small>
    </div>
  );
}

export default Footer;
