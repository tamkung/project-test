import { colors } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as FcIcons from 'react-icons/fc'
import { useParams } from "react-router-dom";
import { firebaseDB } from "../../services/firebase";
import DownloadButton from "../admin/DownloadButton";
import * as AiIcons from "react-icons/ai"
import "../../css/product-details.css";
// import { FcDocument } from 'react-icons/fa';

function download(url) {
  const a = document.createElement('a')
  a.href = url
  a.download = url.split('/').pop()
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

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

    <div>
      <div className="container">
        <div className="card-view">
          <div>
            <div className="img-display" >
              <div className="img-showcase" >
                <img
                  style={{ height: "390px", width: "100%", borderRadius: "5% 5% 5% 5%", padding: "1%" }}
                  src={Images[0]}
                  alt="firebase-images"

                />

              </div>
            </div>
            <div className="btn">
              <div className="img-select col">
                <div className="img-item">
                  <a href={Images[1]} target="_blank" data-id="1">
                    <img className="img-second" src={Images[1]} alt="" />

                  </a>
                </div>
                <div className="img-item">
                  <a href={Images[2]} target="_blank" data-id="2">
                    <img className="img-second" src={Images[2]} alt="" />
                  </a>
                </div>
                <div className="img-item">
                  <a href={Images[3]} target="_blank" data-id="3">
                    <img className="img-second" src={Images[3]} alt="" />
                  </a>
                </div>
                <div className="img-item">
                  <a href={Images[4]} target="_blank" data-id="4">
                    <img className="img-second" src={Images[4]} alt="" />
                  </a>
                </div>
              </div>
              <div>
                <div className="btn btn-outline-primary space">
                  <AiIcons.AiOutlineEye /> {values.View}
                  {/* //AiFillLike */}
                </div>
                <div className="btn btn-outline-primary space">
                  <AiIcons.AiOutlineLike /> {values.View}
                  {/* //AiFillLike */}
                </div>
              </div>
            </div>

          </div>

          <div className="product-content">
            <h2 className="product-title">{values.ThesisName}</h2>
            <a href="#" className="product-link">{values.ThesisType}</a>


            <div className="product-price">
              <p> <span>ผู้พัฒนา</span></p>
              <p className="new-price"> <span> {values.DevName1}</span></p>
              <p className="new-price"> <span> {values.DevName2}</span></p>
            </div>
            <div className="product-price">
              <p> <span>Email : {values.Email}</span></p>

            </div>

            <div className="product-detail"> 
              {values.ThesisDetails}
            </div>

            <DownloadButton />
       
          </div>
        </div>
      </div>
    </div>

  );

}
export default ViewThesis;
