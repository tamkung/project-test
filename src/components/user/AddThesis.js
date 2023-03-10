import React, { useState, useEffect } from "react";
import { firebaseDB, firebaseStorage, firebase } from "../../services/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { ThesisType } from "../user/ThesisType";
import Swal from 'sweetalert2'
var d = new Date();
var saveCurrentDate = d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear();
var saveCurrentTime =
  d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
var dateKey = saveCurrentDate + "," + saveCurrentTime;
function AddThesis() {
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setValues({
        ...values,
        Email: user.email,
        UserId: user.uid,
        DevPhoto: user.photoURL,
      });
      console.log(user.uid, user.email);
    });
  }, []);
  const [values, setValues] = useState({
    UserId: "",
    Email: "",
    DevPhoto: "",
    ThesisImg: [],
    ThesisFile: [],
    ThesisAllow: false,
    ThesisDetails: "",
    ThesisName: "",
    ThesisType: "",
    DevName1: "",
    DevName2: "",
    View: 0,
    Download: 0,
    // Level:"",
  });
  const handleOnChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const createThesis = () => {
    if (values.ThesisName === "") {
      console.log("ใส่ชื่อ ไอ้สอง");
    } else if (values.ThesisType === "") {
      console.log("ใส่ประเภท ไอ้สอง");
    } else if (values.ThesisDetails === "") {
      console.log("ใส่รายละเอียด ไอ้สอง");
    } else if (values.DevName1 === "") {
      console.log("ใส่ชื่อคนทำที่ 1 ไอ้สอง");
    } else if (values.DevName2 === "") {
      console.log("ใส่ชื่อคนทำที่ 2 ไอ้สอง");
    } else if (Images.length == 0) {
      console.log("ใส่รูป ไอ้สอง");
    } else if (Files.length == 0) {
      console.log("ใส่ไฟล์ ไอ้สอง");
    } else {
      AddThesis();
    }
  };
  // -----------ADD IMAGE----------------------------
  const [ShowImages, setShowImages] = useState([]);
  const [Images, setImages] = useState([]);
  const [Files, setFiles] = useState([]);

  const ImgOnChange = (e) => {
    const selectedFIles = [];
    const targetFilesObject = [...e.target.files];

    setImages([...e.target.files]);
    targetFilesObject.map((file) => {
      return selectedFIles.push(URL.createObjectURL(file));
    });
    setShowImages(selectedFIles);
  };

  const FileOnChange = (e) => {
    setFiles([...e.target.files]);
  };

  const AddThesis = () => {
    Images.forEach((files) => {
      const storageRef = ref(
        firebaseStorage,
        `Thesis/Thesis-${dateKey}/Images-${files.name}`
      );
      let timerInterval
      Swal.fire({
        title: 'รอสักครู่',
        timer: 15000,
        didOpen: () => {
          Swal.showLoading()
          const b = Swal.getHtmlContainer().querySelector('b')
          timerInterval = setInterval(() => {
            b.textContent = Swal.getTimerLeft()
          }, 100)
        },
        willClose: () => {
          clearInterval(timerInterval)
        }
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log('I was closed by the timer')
        }
      })
      const uploadTask = uploadBytesResumable(storageRef, files);
      uploadTask.on(
        "state_changed",
        (snapshot) => { },
        (error) => console.log(error),
        async () => {
          await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("Image :", downloadURL);
            values.ThesisImg.push(downloadURL);
            if (values.ThesisImg.length === Images.length) {
              Files.forEach((files) => {
                const storageRef = ref(
                  firebaseStorage,
                  `Thesis/Thesis-${dateKey}/Files-${files.name}`
                );
                const uploadTask = uploadBytesResumable(storageRef, files);
                uploadTask.on(
                  "state_changed",
                  (snapshot) => { },
                  (error) => console.log(error),
                  async () => {
                    await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                      console.log("Files :", downloadURL);
                      values.ThesisFile.push(downloadURL);
                      if (values.ThesisFile.length === Files.length) {
                        console.log("and Add Data");
                        firebaseDB
                          .child("Thesis")
                          .child("Thesis-" + dateKey)
                          .set(values)
                          .then(() => {
                            // <Toast/>
                            window.location.href = '/ListThesis';
                          })
                          .catch((error) => {
                            alert(error);
                          });
                      }
                    });
                  }
                );
              });
            }
          });
        }
      );
    });
  };
  return (
    <div className="container">
      <br />
      <h3>Add New Project</h3>
      <hr />
      <div className="container  p-5">
        <form className="was-validated">
          <div className="form-group">
            <label htmlFor="ThesisName">ชื่อปริญญานิพนธ์</label>
            <input
              type="text"
              id="ThesisName"
              name="ThesisName"
              className="form-control is-valid"
              placeholder="Thesis Name"
              onChange={handleOnChange}
              required
            />
          </div>
          {/* <div className="form-group mt-3">
            <label htmlFor="Level">ระดับ</label>
            <br />
            <select
              name="Level"
              className="form-select"
              required
              onChange={handleOnChange}
            >
              <option value="" >Choose...</option>
              <option value="ปริญญาตรี" >ปริญญาตรี</option>
              <option value="ปริญญาโท" >ปริญญาโท</option>
              <option value="ปริญญาเอก" >ปริญญาเอก</option>
             
            </select>
          </div> */}
          <div className="form-group mt-3">
            <label htmlFor="ThesisType">ประเภทปริญญานิพนธ์</label>
            <br />
            <select
              name="ThesisType"
              className="form-select"
              required
              onChange={handleOnChange}
            >
              <option value="" >Choose...</option>
              {ThesisType.map((item, index) => {
                return (
                  <option key={index} value={item.value}>{item.title}</option>

                );
              })}
              {/* <option value="" >Choose...</option>
              <option value="เว็บไซต์">เว็บไซต์</option>
              <option value="แอปพลิเคชัน">แอปพลิเคชัน</option>
              <option value="อุปกรณ์ iot">อุปกรณ์ iot</option>
              <option value="สื่อการเรียนรู้">สื่อการเรียนรู้</option>
              <option value="เกม">เกม</option>
              <option value="VR AR MR">VR AR MR</option>
              <option value="อื่นๆ">อื่นๆ</option> */}
            </select>
          </div>
          <br />
          <label htmlFor="ThesisType">รายละเอียด</label>
          <textarea
            type="text"
            id="ThesisDetails"
            name="ThesisDetails"
            className="form-control"
            placeholder="ThesisDetails"
            // value={values.name}
            onChange={handleOnChange}
            pattren="{1,250}"
            required
          />
          <div className="form-group mt-3">
            <label htmlFor="ThesisDev">ผู้พัฒนา</label>
            <input
              type="text"
              id="DevName1"
              name="DevName1"
              className="form-control"
              placeholder="Dev Name 1"
              // value={values.name}
              onChange={handleOnChange}
              pattren="[A-Za-zก-๏]{1,250}"
              title="ใส่เป็นตัวอักษรเท่านั้น"
              required
            />
            <div className="form-group mt-3">
              <input
                type="text"
                id="DevName2"
                name="DevName2"
                className="form-control"
                placeholder="Dev Name 2"
                onChange={handleOnChange}
                pattren="[A-Za-zก-๏]{1,250}"
                title="ใส่เป็นตัวอักษรเท่านั้น"
                required
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="ThesisDev">
                อัปโหลดรูปภาพ อัตราส่วน 1:1
              </label>
              <input
                className="form-control"
                type="file"
                id="formFileMultiple"
                accept="image/*"
                onChange={ImgOnChange}
                multiple
                required
              />
              <div className="row mt-3" >
                {ShowImages.map((url, i) => (
                  <div className="col" key={i} >
                    <img
                      className="d-block w-100"
                      src={url}
                      alt="firebase-images"
                      style={{ maxHeight: "500px" }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="form-group mt-3">
              <label htmlFor="ThesisDev">PDF ( รวมเล่มฉบับสมบูรณ์ )</label>
              <input
                className="form-control"
                type="file"
                id="formFileMultiple"
                accept=".pdf"
                onChange={FileOnChange}
                required
              />
            </div>
          </div>
          <br />
          <div className="row mt-3 mb-2">
            <Link
              className="btn col mx-3"
              to="/ListThesis"
              style={{ color: "gray", fontSize: "24px" }}
            >
              <IoIosArrowBack />
            </Link>

            <button
              className="btn btn-success col mb-2 mx-3"
              onClick={createThesis}
              type="button"
            >
              {/* <Link className="btn" to="/ListThesis" style={{ color: "white" }}> */}
              Submit
              {/* </Link> */}
            </button>

            <button
              type="reset "
              className="btn btn-warning col mb-2 mx-3"
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
  );
}
export default AddThesis;