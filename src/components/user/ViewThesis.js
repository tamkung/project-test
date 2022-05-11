import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import { firebaseDB, firebase } from "../../services/firebase";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import * as AiIcons from "react-icons/all";
import "../../css/product-details.css";

function ViewThesis() {
  const { id } = useParams();
  const [values, setValues] = useState({});
  const [Images, setImages] = useState([]);
  const [Likes, setLikes] = useState([]);
  const [user, setUser] = useState(null);
  const CheckLike =Likes.findIndex((id) => id == user.uid);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
      firebaseDB
        .child("Thesis")
        .child(id)
        .on("value", (snapshot) => {
          if (snapshot.val() !== null) {
            setValues({ ...snapshot.val() });
            setImages(snapshot.child("ThesisImg").val());
            setLikes(snapshot.child("Like").val());
          } else {
            setValues({});
          }
        });
    });
    return () => {
      setValues({});
    };
  }, [id]);

  const btnLike = () => {
    if (Likes.length == null) {
      firebaseDB.child("Thesis").child(id).child("Like").child(0).set(user.uid);
    } else {
      firebaseDB
        .child("Thesis")
        .child(id)
        .child("Like")
        .child(Likes.length)
        .set(user.uid);
    }
  };
  const btnUnLike = () => {
    if (Likes.length == null) {
      firebaseDB.child("Thesis").child(id).child("Like").child(0).set(user.uid);
    } else {
      firebaseDB
        .child("Thesis")
        .child(id)
        .child("Like")
        .child(Likes.length)
        .set(user.uid);
    }
  };

  console.log("CheckLink : ", CheckLike);

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
              {CheckLike ?(
                 <button
                 className="btn-like"
                 size="lg"
                 onClick={() => btnUnLike(id,CheckLike)}
               >
                 <AiIcons.AiOutlineLike /> {Likes.length}
               </button>
              ) : (
                <button
                  className="btn-like"
                  size="lg"
                  onClick={() => btnLike(id)}
                >
                  <AiIcons.AiOutlineLike /> {Likes.length}
                </button>
              )}
              <button
                className="btn-download"
                target="_blank"
                size="lg"
                onClick={() => (
                  (window.location.href = `${values.ThesisFile[0]}`),
                  firebaseDB
                    .child("Thesis")
                    .child(id)
                    .update({ Download: values.Download + 1 })
                )}
              >
                <AiIcons.AiOutlineDownload /> {values.Download}
              </button>
            </div>
          </div>
        </div>
        <hr />
        <InputGroup className="mb-3">
          <FormControl
            placeholder="แสดงความคิดเห็น..."
            aria-describedby="basic-addon2"
          />
          <Button variant="outline-success" id="button-addon2">
            <AiIcons.AiOutlineSend className="me-3" />
            Send
          </Button>
        </InputGroup>
      </div>
    </div>
  );
}
export default ViewThesis;
