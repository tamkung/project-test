import React from "react";
import "../../css/Footer.css";
import * as FaIcons from 'react-icons/fa'
import * as SiIcons from 'react-icons/si'
import * as RiIcons from 'react-icons/ri'
function Footer() {
  function myFunction() {
    /* Get the text field */
    var copyText = document.getElementById("myInput");
    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */
    /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText.value);
    /* Alert the copied text */
    alert("Copied" + copyText.value + " in your Clipboard");
  }
  return (
    <div>
      <footer className="site-footer">
        <div className="box" >
          <div className="row">
            <div>
              <h6 style={{ fontWeight: "bold", textAlign: "center", width: "100%" }}>สถานที่ตั้ง</h6>
              <p style={{ color: "lightgray", fontWeight: "light", textAlign: "center", width: "100%" }} className="text-justify">
                สาขาวิชาเทคโนโลยีคอมพิวเตอร์ภาควิชาคอมพิวเตอร์ศึกษา ตึก 52 ชั้น 2 คณะครุศาสตร์อุตสาหกรรม
                มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ 1518 ถนนประชาราษฎร์ 1 แขวงวงศ์สว่าง เขตบางซื่อ กรุงเทพมหานคร 10800
              </p>
              <div>
                <div className="social-icons" style={{ textAlign: "center", width: "100%" }}>
                  <a className="facebook" href="https://www.facebook.com/CEDKMUTNB"><FaIcons.FaFacebookF /></a>
                  <input type="text" hidden={true} defaultValue="ced@fte.kmutnb.ac.th" id="myInput" />
                  <a className="mail" onClick={myFunction} ><SiIcons.SiMaildotru /> </a>
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
