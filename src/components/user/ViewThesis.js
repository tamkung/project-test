import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import { firebaseDB } from "../../services/firebase";
import * as AiIcons from "react-icons/ai"
import "../../css/product-details.css";

// function download(url) {
//   const a = document.createElement('a')
//   a.href = url
//   a.download = url.split('/').pop()
//   document.body.appendChild(a)
//   a.click()
//   document.body.removeChild(a)
// }

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

  return (

    <div>
      <div className="container" style={{ width: "100%" }}>
        <div className="card-view">
          <div className="container" style={{ maxWidth: "1500px", textAlign: "center" }}>
            <div style={{ textAlign: "center", border: "2px solid black", boxShadow: "2px 2px 3px gray" }}>
              <Carousel variant="light" >
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={Images[1]}
                    alt="1500*500"
                    style={{ minHeight: "200px", maxHeight: "500px", width: "1000px" }}
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={Images[2]}
                    alt="1500*500"
                    style={{ minHeight: "200px", maxHeight: "500px", width: "1000px" }}
                  />

                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={Images[3]}
                    alt="1500*500"
                    style={{ minHeight: "200px", maxHeight: "500px", width: "1000px" }}
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={Images[4]}
                    alt="1500*500"
                    style={{ minHeight: "200px", maxHeight: "500px", width: "1000px" }}
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={Images[5]}
                    alt="1500*500"
                    style={{ minHeight: "200px", maxHeight: "500px", width: "1000px" }}
                  />
                </Carousel.Item>
              </Carousel>
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
          </div>
        </div>
      </div>
    </div>

  );

}
export default ViewThesis;
