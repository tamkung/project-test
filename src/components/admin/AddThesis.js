import React, { useState, useEffect } from "react";
import { firebaseDB, firebaseStorage, firebase } from "../../services/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
// import { AiOutlineLike } from "react-icons/ai";

// import { Toast } from "bootstrap";;
// import {dateKey} from '../dataKey';
import Footer from "../Footer";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
var d = new Date();
var saveCurrentDate = d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear();
var saveCurrentTime =
  d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
var dateKey = saveCurrentDate + "," + saveCurrentTime;

function AddThesis() {
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      // setValues({...values,UserId:user.uid});
      setValues({ ...values, Email: user.email, UserId: user.uid });
      console.log(user.uid, user.email);
    });
  }, []);

  const [values, setValues] = useState({
    UserId: "",
    Email: "",
    ThesisImg: "[]",
    ThesisAllow: false,
    ThesisFile: "[]",
    ThesisDetails: "",
    ThesisName: "",
    ThesisType: "",
    DevName1: "",
    DevName2: "",
    Like: 0,
    View: 0,
    Download: 0,
  });

  const handleOnChange = (e) => {
    // console.log(e.target.name);
    // console.log(e.target.value);
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const createThesis = (e) => {
    // e.preventDefault();

    if (!useState) {
      console.error("null");
    } else {
      // --------add data----------------
      // ----------------- push----------เจคคีย์ใหม่ให้
      // ----------------- set----------ใส่ค่าที่มีอยู่ลงใน child
      firebaseDB
        .child("Thesis")
        .child("Thesis-" + dateKey)
        .set(values)
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
  // -----------ADD IMAGE----------------------------
  const [Images, setImages] = useState([]);
  const [Files, setFiles] = useState([]);

  const ImgOnChange = (e) => {
    const selectedFIles = [];
    const targetFilesObject = [...e.target.files];

    targetFilesObject.map((file) => {
      return selectedFIles.push(URL.createObjectURL(file));
    });
    setImages(selectedFIles);
    uploadImage(targetFilesObject);
    // console.log(Images);
  };

  const FileOnChange = (e) => {
    const selectedFIles = [];
    const targetFilesObject = [...e.target.files];

    targetFilesObject.map((file) => {
      return selectedFIles.push(URL.createObjectURL(file));
    });
    setFiles(selectedFIles);
    uploadFiles(targetFilesObject);
    // console.log(Images);
  };

  const uploadImage = (targetFilesObject) => {
    const dowUrls = [];
    targetFilesObject.forEach((files) => {
      const storageRef = ref(
        firebaseStorage,
        `Thesis/${dateKey}/${files.name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, files);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => console.log(error),
        async () => {
          await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);

            return dowUrls.push(downloadURL);
          });
        }
      );
    });
    setValues({ ...values, ThesisImg: dowUrls });
  };

  const uploadFiles = (targetFilesObject) => {
    targetFilesObject.forEach((files) => {
      const storageRef = ref(
        firebaseStorage,
        `Thesis/${dateKey}/${files.name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, files);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => console.log(error),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            setValues({ ...values, ThesisFile: [downloadURL] });
            console.log(values.ThesisFile);
          });
        }
      );
    });
  };
  return (
    <>
      <div className="container">
        <hr />
        <br />
        <h3>Add New Thesis</h3>
        <br />
        <div className="container">
          <form>
            <div className="form-group">
              <label htmlFor="ThesisName">ชื่อปริญญานิพนธ์</label>

              <input
                type="text"
                id="ThesisName"
                name="ThesisName"
                className="form-control"
                placeholder="Thesis Name"
                onChange={handleOnChange}
                pattren="[A-Za-zก-๏]{1,250}"
                title="ใส่เป็นตัวอักษรเท่านั้น"
              />
            </div>

            <div className="form-group mt-3">
              <label htmlFor="ThesisType">ประเภทปริญญานิพนธ์</label>

              <br />
              <select
                name="ThesisType"
                className="form-control"
                onChange={handleOnChange}
              >
                <option selected>Choose...</option>
                <option value="เว็บไซต์">เว็บไซต์</option>
                <option value="แอปพลิเคชัน">แอปพลิเคชัน</option>
                <option value="อุปกรณ์ Iot">อุปกรณ์ Iot</option>
                <option value="สื่อการสอน">สื่อการสอน</option>
                <option value="เกม">เกม</option>
                <option value="VR AR MR">VR AR MR</option>
                <option value="อื่นๆ">อื่นๆ</option>
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
              />
              <div className="form-group mt-3">
                <input
                  type="text"
                  id="DevName2"
                  name="DevName2"
                  className="form-control"
                  placeholder="Dev Name 2"
                  // value={values.name}
                  onChange={handleOnChange}
                  pattren="[A-Za-zก-๏]{1,250}"
                  title="ใส่เป็นตัวอักษรเท่านั้น"
                />
              </div>

              <div className="form-group mt-3">
                <label htmlFor="ThesisDev">อัปโหลดรูปภาพ</label>
                <input
                  className="form-control"
                  type="file"
                  id="formFileMultiple"
                  accept="image/*"
                  onChange={ImgOnChange}
                  multiple
                />

                {/* {Images.map((url, i) => (
                  <img
                    key={i}
                    style={{ width: "300px" }}
                    src={url}
                    alt="firebase-images"
                  />
                ))} */}
              </div>
              <div className="form-group mt-3">
                <label htmlFor="ThesisDev">PDF</label>
                <input
                  className="form-control"
                  type="file"
                  id="formFileMultiple"
                  accept=".pdf"
                  onChange={FileOnChange}
                />

                {/* {Images.map((url, i) => (
                  <img
                    key={i}
                    style={{ width: "300px" }}
                    src={url}
                    alt="firebase-images"
                  />
                ))} */}
              </div>
            </div>

            <br />

            <div className="row mt-3">
              <Link
                className="btn col mx-3"
                to="/ListThesis"
                style={{ color: "gray", fontSize: "24px" }}
              >
                <IoIosArrowBack />
              </Link>
              <button
                className="btn btn-success col mx-3"
                onClick={createThesis}
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
      <Footer />
    </>
  );
}
export default AddThesis;
