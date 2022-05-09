import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import { firebaseDB } from "../../services/firebase";
import { ButtonGroup, Button, ListGroup } from "react-bootstrap";
import * as AiIcons from "react-icons/all";
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
  const [Files, setFiles] = useState([]);

  // firebaseDB.child("Thesis").child(id).update({View:values.View+1}).then().catch((err)=>console.error(err));

  useEffect(() => {
    firebaseDB.child("Thesis").child(id).on("value", (snapshot) => {
        if (snapshot.val() !== null) {
          setValues({ ...snapshot.val()});
          setImages(snapshot.child("ThesisImg").val());
          setFiles(snapshot.child("ThesisFile").val());
        } else {
          setValues({});
        }
      });
    return () => {
      setValues({});
      
    };
  }, [id]);
  
  console.log("setImages : ",Images);
  console.log("setFiles : ",Files);
  console.log("Files : ",values.ThesisFile);
  console.log("View : ",values.View);

  return (
    <div>
      <div className="container" style={{ width: "100%" }}>
        <div className="card-view">
          <div style={{ maxWidth: "1500px", textAlign: "center" }}>
            <div
              style={{
                minHeight: "200px",
                border: "2px solid black",
                boxShadow: "2px 2px 3px gray",
                marginTop: "30px",
              }}
            >
              <Carousel>
                {Images.map((url, i) => (
                  <Carousel.Item interval={3000} key={i}>
                    <img
                      className="d-block w-100"
                      src={url}
                      alt="First slide"
                      style={{
                        minHeight: "200px",
                        height: "20vw",
                        textAlign: "center",
                      }}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
          </div>

          <div className="product-content">
            <h2 className="product-title">{values.ThesisName}</h2>
            <a href="#" className="product-link">
              {values.ThesisType}
            </a>

            <div className="product-price">
              <span>ผู้พัฒนา</span>
              <br />
              <span className="new-price">
                คนที่ 1 : {values.DevName1}
              </span>{" "}
              <br />
              <span className="new-price">คนที่ 2 : {values.DevName2}</span>
            </div>
            <div className="product-price">
              <span className="new-price">Email : {values.Email}</span>
            </div>
            <div className="product-detail">{values.ThesisDetails}</div>
            <div className="mt-3">
              <Button className="mx-2" size="lg">
                <AiIcons.AiOutlineLike /> Like
              </Button>
              {/* <Button className="mx-2" size="lg">Middle</Button> */}
            </div>
          </div>
        </div>
        <hr />
        <div className="bg-danger">
          <div className="row">
            {Files.map((url,i)=>(
            <>
            <div className="col-10">{url}</div>
               <div className="col-2"><AiIcons.AiOutlineDownload /></div>
               </>))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default ViewThesis;
