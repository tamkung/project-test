import React, { useState, useEffect } from "react";
import { firebaseDB, firebaseStorage, firebase } from "../../services/firebase";
import Swal from 'sweetalert2'
import { Link } from "react-router-dom";
var d = new Date();
var saveCurrentDate = d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear();
var saveCurrentTime =
  d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
var dateKey = saveCurrentDate + "," + saveCurrentTime;

function Report() {
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      // setValues({...values,UserId:user.uid});
      setValues({ ...values, Email: user.email, UserId: user.uid });
      console.log(user.uid, user.email);
    });
  }, []);
  const [values, setValues] = useState(
    {
      DataTime: saveCurrentDate,
      UserId: "",
      Email: "",
      RpDetails: "",
      ReportType: "",
      RpHeader: "",
      status: "false"
    });
  const handleOnChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const sendReport = (e) => {
    Swal.fire({
      title: 'ต้องการส่งรายงานนี้หรือไม่?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#189B12',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ส่ง',
      cancelButtonText: 'ยกเลิก'
    }).then((result) => {
      if (result.isConfirmed) {
        firebaseDB.child("Report").push(values).then(() => Swal.fire(
          'ส่งรายงานปัญหาเรียบร้อย!',
          '',
          'success'
        )).catch((e) => console.log(e));

      }
    })

  };
  return (
    <>
      <div className="container">
        <br />
        <h3>รายงานปัญหา</h3>
        <br />
        <div div className="container">
          <form>
            <div className="form-group">
              <label>ห้วข้อ</label>
              <input
                type="text"
                id="RpHeader"
                name="RpHeader"
                className="form-control"
                placeholder="Report Name :"
                onChange={handleOnChange}
                pattren="[A-Za-zก-๏]{1,250}"
                title="ใส่เป็นตัวอักษรเท่านั้น"
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="ReportType">ประเภทปัญหา</label>
              <br />
              <select
                name="ReportType"
                className="form-control"
                onChange={handleOnChange}>
                <option defaultValue="none">Choose...</option>
                <option value="แจ้ง ลบ/แก้ไข ผลงาน">แจ้ง ลบ/แก้ไข ผลงาน</option>
                <option value="ระบบมีปัญหา">ระบบมีปัญหา</option>
                <option value="อื่นๆ">อื่นๆ</option>
              </select>
            </div>
            <br />
            <label>รายละเอียด</label>
            <textarea
              type="text"
              id="RpDetails"
              name="RpDetails"
              className="form-control"
              placeholder="Details :"
              onChange={handleOnChange}
              pattren="{1,250}"
            />
            <br />
            <div className="row mt-3">
              <div type="button"
                className="btn btn-success col mx-3"
                onClick={() => {
                  if (values.RpDetails === "" || values.ReportType === "Choose..." || values.RpHeader === "") {
                    Swal.fire({
                      icon: 'error',
                      title: 'กรุณากรอกให้ครบถ้วน',
                    })
                  } else {
                    sendReport()
                  }}}>
                Send
              </div>
              <button
                type="reset"
                className="btn btn-warning col mx-3"
                style={{ color: "white" }} >
                Clear
              </button>
            </div>
          </form>
          <br />
        </div>
        <br />
      </div>
    </>
  );
}
export default Report;