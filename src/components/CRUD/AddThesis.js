import React, { useState, useEffect } from "react";
import { firebaseDB, firebaseStorage } from "../../services/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

// import { Toast } from "bootstrap";;
// import {dateKey} from '../dataKey';

var d = new Date();
var saveCurrentDate = d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear();
var saveCurrentTime = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
var dateKey = saveCurrentDate + "," + saveCurrentTime;




function AddThesis() {

  const [values, setValues] = useState({
    // UserId:{user.googleId},
    ThesisImg: '[]',
    ThesisDetails: "",
    ThesisName: "",
    ThesisType: "",
    DevName1: "",
    DevName2: "",
  });

  const handleOnChange = (e) => {
    // console.log(e.target.name);
    // console.log(e.target.value);
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const createThesis = (e) => {
    e.preventDefault();

    if (!useState) {
      console.error("null");
    } else {
      // --------add data----------------
      // ----------------- push----------เจคคีย์ใหม่ให้
      // ----------------- set----------ใส่ค่าที่มีอยู่ลงใน child
      firebaseDB.child("Thesis").child("Thesis-" + dateKey).set(values, (error) => {
        if (error) {
          alert.error(error);
        }
        else {
          console.log("add data success");


        }
      });
    }
  }
// -----------ADD IMAGE----------------------------
  const [Images, setImages] = useState([]);

  const ImgOnChange = (e) => {
    const selectedFIles = [];
    const targetFilesObject = [...e.target.files];

    targetFilesObject.map((file) => {
      return selectedFIles.push(URL.createObjectURL(file));
    });
    setImages(selectedFIles);
    uploadFiles(targetFilesObject);
    // console.log(Images);
  };

  const uploadFiles = (targetFilesObject) => {

    targetFilesObject.map((files) => {
      const storageRef = ref(
        firebaseStorage,
        `Thesis/${dateKey}/${files.name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, files);

      uploadTask.on(
        "state_changed",
        (snapshot) => {

        },
        (error) => console.log(error),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            setValues({ ...values, ThesisImg: [downloadURL] });
            console.log(values.ThesisImg);
          });
        }
      );


    }
    );
  }
  return (
    <div className="container">
      <h1>Add New Thesis</h1>
      <hr />
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
              // value={values.name}
              onChange={handleOnChange}
            />
          </div>

          <div className="form-group mt-3">
            <label htmlFor="ThesisType">ประเภทปริญญานิพนธ์</label>

            <br />
            <select name="ThesisType" className="form-control" onChange={handleOnChange}>
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
          <label htmlFor="ThesisType">รายละเอียด</label>
          <textarea 
              type="text"
              id="ThesisDetails"
              name="ThesisDetails"
              className="form-control"
              placeholder="ThesisDetails"
              // value={values.name}
              onChange={handleOnChange}
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
              />
            </div>

            <div class="form-group mt-3">
              <label htmlFor="ThesisDev">อัปโหลดรูปภาพ</label>
              <input className="form-control"
                type="file"
                id="formFileMultiple"
                accept="image/*"
                onChange={ImgOnChange}
                multiple
              />

              {Images.map((url, i) => (
                <img
                  key={i}
                  style={{ width: "300px" }}
                  src={url}
                  alt="firebase-image"
                />
              ))}
            </div>

          </div>



          <div className="row mt-3">
            <button className="btn btn-warning col mx-3" onClick={createThesis} to='/AdManageThesis'>
              Submit

            </button>

            <button className="btn btn-danger col mx-3" onclick="javascript:history.back(1)">
              Cancel
            </button>

        

          </div>
        </form>
        <br />
      </div>
      <p>


      </p>

    </div>
  );
}
export default AddThesis;