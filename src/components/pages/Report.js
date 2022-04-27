import '../../css/App.css';
import React, { useState } from "react";
import { firebaseDB, firebaseStorage } from "../../services/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { Link } from 'react-router-dom';

import Footer from '../Footer';
var d = new Date();
var saveCurrentDate = d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear();
var saveCurrentTime = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
var dateKey = saveCurrentDate + "," + saveCurrentTime;
function Report() {
  const [values, setValues] = useState({
    // UserId:{user.googleId},
    FromEmail: "",
    DataTime: dateKey,
    RpHeader: "",
    RpDetail: "",
    chkcomp:""

  });

  const handleOnChange = (e) => {
    // console.log(e.target.name);
    // console.log(e.target.value);
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const sendReport = (e) => {
    e.preventDefault();
    if (
      window.confirm("คุณแน่ใจว่าจะรายงานปัญหานี้หรือไม่ ?")
    ) {
    if (!useState) {
      console.error("null");
    } else {
      // --------add data----------------
      // ----------------- push----------เจคคีย์ใหม่ให้
      // ----------------- set----------ใส่ค่าที่มีอยู่ลงใน child
      firebaseDB.child("Report").child("Report-" + dateKey).set(values, (error) => {
        if (error) {
          alert.error(error);
        }
        else {
          console.log("add data success");


        }
      });
    }
  }
}
  


  return (
    <>
      <div className="container" style={{height:"700px"}}>
        <br />
        <h3>รายงานปัญหา</h3>
        <br />
        <div className="container">
          <form>
            <div className="form-group">

              <label htmlFor="ThesisName">อีเมล</label>

              <input
                type="email"
                id="FromEmail"
                name="FromEmail"
                className="form-control"
                placeholder="Email"
                onChange={handleOnChange}
              />
            </div>

            <div className="form-group mt-3">
              <label htmlFor="ThesisDev">หัวข้อ</label>

              <input
                type="text"
                id="RpHeader"
                name="RpHeader"
                className="form-control"
                placeholder="Header"
                // value={values.name}
                onChange={handleOnChange}

              />
            </div>
            <br />
            <label htmlFor="ThesisType">รายละเอียด</label>
            <textarea
              type="text"
              id="RpDetail"
              name="RpDetail"
              className="form-control"
              placeholder="Details"
              // value={values.name}
              onChange={handleOnChange}
            />
            







            <br />

            <div className="row mt-3">
              <button className="btn btn-success col mx-3" onClick={sendReport}>
              
                <Link className="btn" to='/report' style={{ color: "white" }}>Submit</Link>

              </button>

              {/* <button className="btn btn-danger col mx-3" onclick={{javascript:history.back(1)}}>
              Cancel
             </button> */}

              <button type="reset" className="btn btn-warning col mx-3" style={{ color: "white" }}>
                Clear
              </button>



            </div>
          </form>
          <br />
        </div>
      </div>
    </>
  );
}
export default Report;
