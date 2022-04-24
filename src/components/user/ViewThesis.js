import { colors } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { firebaseDB } from "../../services/firebase";


function ViewThesis() {
  const { id } = useParams();
  const [values, setValues] = useState({});
  const [Images, setImages] = useState([]);

  useEffect(() => {
    firebaseDB
      .child("Thesis")
      .child(id)
      .on("value", (snapshot) => {
        if (snapshot.val() !== null) {
          setValues({ ...snapshot.val() });
          setImages(snapshot.child("ThesisImg").val());
        } else {
          setValues({});
        }
      });
    return () => {
      setValues({});
    };
  }, [id]);
  console.log(Images);
  // setImages(values.ThesisImg)

  return (
    <div className="container">
      <hr />
      <br />
      <div className="container">
        <table className="table table-hover">
          <thead>
            <tr>
              <th colSpan="2">{values.ThesisName}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">ประเภทปริญญานิพนธ์</th>
              <td>{values.ThesisType}</td>
            </tr>
            <tr>
              <th scope="row">ผู้พัฒนา คนที่ 1</th>
              <td>{values.DevName1}</td>
            </tr>
            <tr>
              <th scope="row">ผู้พัฒนา คนที่ 2</th>
              <td>{values.DevName2}</td>
            </tr>
            <tr>
              <th scope="row">รายละเอียด</th>
              <td>{values.ThesisDetails}</td>
            </tr>
            <tr>
              <th scope="row">ไฟล์</th>
              <td>{values.ThesisFile}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="container">
   
        {Images.map((url, i) => (
          <img
            style={{ width: "200px" ,height:"200px" }}
            src={url}
            key={i}
            alt="firebase-images"
          />
        ))}

        {/* <h3>{values.ThesisName}</h3> */}
      </div>
    </div>
  );
}
export default ViewThesis;
