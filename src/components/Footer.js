import React from "react";
import "../css/Footer.css";
// import { Button } from './Button';
import { Link } from "react-router-dom";
import * as MdIcons from "react-icons/md"
function Footer() {

  return (
    <div className="footer-container">
      <div className="footer-logo">
        <Link to="/" className="social-logo">
          Collector
        </Link>
      </div>
      <small className="website-rights"></small>
      <div className="social-icons">
        <Link className="btn btn-outline-light circle" to="/admin/sign-in" onClick={'/'}>
          <MdIcons.MdAdminPanelSettings size={40} />
        </Link>
        <Link className="btn btn-outline-light circle" to="/admin/sign-in" onClick={'/'}>
          <MdIcons.MdAdminPanelSettings size={40} />
        </Link>
        <Link className="btn btn-outline-light circle" to="/admin/sign-in" onClick={'/'}>
          <MdIcons.MdAdminPanelSettings size={40} />
        </Link>
        <Link className="btn btn-outline-light circle" to="/admin/sign-in" onClick={'/'}>
          <MdIcons.MdAdminPanelSettings size={40} />
        </Link>
        <Link className="btn btn-outline-light circle" to="/admin/sign-in" onClick={'/'}>
          <MdIcons.MdAdminPanelSettings size={40} />
        </Link>
      </div>

    </div>
  );
}

export default Footer;
