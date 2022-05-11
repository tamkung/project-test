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
          </div>
          <div className="row">
            <div>
              <h6 style={{ fontWeight: "bold", textAlign: "center", width: "100%" }}>สถานที่ตั้ง</h6>
              <p style={{ color: "lightgray", fontWeight: "light", textAlign: "center", width: "100%" }} className="text-justify">
                สาขาวิชาเทคโนโลยีคอมพิวเตอร์
                ภาควิชาคอมพิวเตอร์ศึกษา ตึก 52 ชั้น 2
                คณะครุศาสตร์อุตสาหกรรม
                มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ
                1518 ถนนประชาราษฎร์ 1 แขวงวงศ์สว่าง เขตบางซื่อ
                กรุงเทพมหานคร 10800
              </p>
              <div>
                <div className="social-icons" style={{ textAlign: "center", width: "100%" }}>
                  <a className="facebook" href="#"><FaIcons.FaFacebookF /></a>
                  <a className="mail" href="#"><SiIcons.SiMaildotru /> </a>
                  <a className="admin" href="/admin/sign-in"><RiIcons.RiAdminFill /> </a>
                </div>
              </div>
            </div>
          </div>
          <hr />
        </div>
      </footer>
    </div>
  )
}

export default Footer;
