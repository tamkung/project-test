import React, { useState, useEffect } from "react";
import { firebaseDB, firebaseStorage, firebase } from "../../services/firebase";
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
      UserId: "",
      Email: "",
      RpDetails: "",
      ReportType: "",
      RpHeader: "",
      status: false
    });

  const handleOnChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const sendReport = (e) => {
    if (!useState) {
      console.error("null");
    } else {
      // --------add data----------------
      // ----------------- push----------เจคคีย์ใหม่ให้
      // ----------------- set----------ใส่ค่าที่มีอยู่ลงใน child
      firebaseDB
        .child("Report")
        .push(values)
        .then(() => {
          alert("add data success");
        })
        .catch((error) => {
          alert(error);
        });
      //   , (error) => {
      //   if (error) {
      //     alert.error(error);
      //   }
      //   else {
      //     console.log("add data success");

      //   }
      // });
    }
  };




  return (
    <>
      <div className="container">
        <br />
        <h3>รายงานปัญหา</h3>
        <br />
        <div className="container">
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
                onChange={handleOnChange}

              >
                <option defaultValue="">Choose...</option>
                <option value="เว็บไซต์">แจ้ง ลบ/แก้ไข ผลงาน</option>
                <option value="แอปพลิเคชัน">ระบบมีปัญหา</option>
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
            <div className="form-group mt-3">
              <label htmlFor="Email">อีเมล</label>
              <input
                type="email"
                id="Email"
                name="Email"
                className="form-control"
                placeholder="Email :"
                // value={values.name}
                onChange={handleOnChange}
                title="ใส่เป็นตัวอักษรเท่านั้น"
              />

            </div>

            <br />

            <div className="row mt-3">

              <button
                className="btn btn-success col mx-3"
                onClick={sendReport}
                type="submit"
                to="/ListThesis"
              >
                <Link
                  className="btn"
                  to="/ListThesis"
                  style={{ color: "white" }}
                >
                  Submit
                </Link>
              </button>

              {/* <button className="btn btn-danger col mx-3" onclick={{javascript:history.back(1)}}>
              Cancel
             </button> */}

              <button
                type="reset "
                className="btn btn-warning col mx-3"
                style={{ color: "white" }}
              >
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
