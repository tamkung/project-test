import React from "react";
import "../../css/Footer.css";
import * as FaIcons from 'react-icons/fa'
import * as SiIcons from 'react-icons/si'
import * as RiIcons from 'react-icons/ri'
function Footer() {
  return (
    <div>
      <footer className="site-footer">
        <div className="box" >
          <div className="row">
            <div className="col-sm-12 col-md-6">
              <h6>About</h6>
              <p className="text-justify">ภาควิชาคอมพิวเตอร์ศึกษา</p>
              <p className="text-justify">ชั้น2 คณะครุศาสตร์อุตสาหกรรม</p>
              <p className="text-justify">มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ</p>
            </div>

            <div className="col-xs-6 col-md-3">
              <h6>Categories</h6>
              <ul className="footer-links">
                <li><a href="http://scanfcode.com/category/c-language/">C</a></li>
                <li><a href="http://scanfcode.com/category/front-end-development/">UI Design</a></li>
                <li><a href="http://scanfcode.com/category/back-end-development/">PHP</a></li>
                <li><a href="http://scanfcode.com/category/java-programming-language/">Java</a></li>
                <li><a href="http://scanfcode.com/category/android/">Android</a></li>
                <li><a href="http://scanfcode.com/category/templates/">Templates</a></li>
              </ul>
            </div>

            <div className="col-xs-6 col-md-3">
              <h6>Quick Links</h6>
              <ul className="footer-links">
                <li><a href="http://scanfcode.com/about/">Home</a></li>
                <li><a href="http://scanfcode.com/contact/">Contact Us</a></li>
                <li><a href="http://scanfcode.com/contribute-at-scanfcode/">Contribute</a></li>
                <li><a href="http://scanfcode.com/privacy-policy/">Privacy Policy</a></li>
                <li><a href="http://scanfcode.com/sitemap/">Report</a></li>
              </ul>
            </div>
          </div>
          <hr />
        </div>
        <div className="box">
          <div className="row">
            <div className="col-md-8 col-sm-6 col-xs-12">
              <p className="copyright-text">Copyright &copy; 2017 All Rights Reserved by
                <a href="#">Scanfcode</a>.
              </p>
            </div>

            <div className="col-md-4 col-sm-6 col-xs-12">
              <ul className="social-icons" style={{ textAlign: "center" }}>
                <li><a className="facebook" href="#"><FaIcons.FaFacebookF /></a></li>
                <li><a className="mail" href="#"><SiIcons.SiMaildotru /> </a></li>
                <li><a className="danger" href="#"><RiIcons.RiAdminFill /> </a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer;
