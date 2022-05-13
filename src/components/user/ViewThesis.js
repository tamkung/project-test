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
  const [IndexLike, setIndexLike] = useState(null);
  const [CheckLike, setCheckLike] = useState(null);
  const [Comment, setComment] = useState({});

  const [TextCom, setTextCom] = useState("");


  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user !== null) {
        setUser(user);
        firebaseDB
          .child("Thesis")
          .child(id)
          .on("value", (snapshot) => {
            if (snapshot.val() !== null) {
              setValues({ ...snapshot.val() });
              setImages(snapshot.child("ThesisImg").val());
              setLikes(snapshot.child("Like").val());
              setComment(snapshot.child("Comment").val());
              const ValLike = snapshot.child("Like").val()
              if(ValLike !== null){
                setIndexLike(ValLike.findIndex((id) => id == user.uid));
                setCheckLike(ValLike.find((id) => id == user.uid));
              }else{
                setIndexLike(null);
                setCheckLike(null);
              }
            } else {
              setValues({});
            }
          });
      } else {
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
      }

    });
    return () => {
      setValues({});
    };
  }, [id]);

  const btnLike = () => {
    if (Likes == null) {
      firebaseDB.child("Thesis").child(id).child("Like").child(0).set(user.uid);
    } else {
      firebaseDB.child("Thesis").child(id).child("Like").child(Likes.length).set(user.uid);
    }
  };
  const btnUnLike = () => {
    firebaseDB.child("Thesis").child(id).child("Like").child(IndexLike).remove().then(() => console.log('unLike')).catch((err) => console.log(err));
  };

  const btnCommentThesis = () =>{
    firebaseDB.child("Thesis").child(id).child("Comment").push({
      text: TextCom,
      uId: user.uid,
      uName: user.displayName,
      uImg: user.photoURL,

    }).then(() => {
      setTextCom("")
      console.log('CommentText')
    })
      .catch((err) => console.log(err));
  }
  const btnDelComment = (uid) => {
    firebaseDB.child("Thesis").child(id).child("Comment").child(uid).remove().then(() => console.log('delete')).catch((err) => console.log(err));
  };

  console.log("User : ", user);
  console.log("IndexLink : ", IndexLike);
  console.log("CheckLike : ", CheckLike);
  console.log("Comment : ", TextCom);
  console.log("Comment Firbase : ", Comment);

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
                <button className="btn-like" size="lg"  onClick={() => btnUnLike()}   >
                  <AiIcons.AiFillLike /> {Likes ?(Likes.length):(0)}
                </button>
              ) : (
                <button className="btn-like" size="lg" onClick={() => btnLike()}>
                  <AiIcons.AiOutlineLike /> {Likes ?(Likes.length):(0)}
                </button>
              )}

              <button className="btn-download" target="_blank" size="lg" onClick={() => (
                  (window.href = `${values.ThesisFile[0]}`),
                  firebaseDB.child("Thesis").child(id).update({ Download: values.Download + 1 })
                )}>
                <AiIcons.AiOutlineDownload /> {values.Download}
              </button>

            </div>
          </div>
        </div>
        <hr />
        {Comment ? (
          Object.keys(Comment).map((id, index) => {
            if (Comment[id].uId == user.uid) {
              return (
                <div key={index} style={{ position: "relative" }}>
                  <button className="btn-delete-comment" style={{ position: "absolute", right: "0%" }} onClick={() => btnDelComment(id)}>ลบ</button>
                  <div>
                    <img style={{ borderRadius: "50%", width: "50px" }} src={Comment[id].uImg} /> <a style={{ fontSize: "1vw", marginLeft: "10px" }}>{Comment[id].uName}</a>
                  </div>
                  <p style={{ marginTop: "2%" }}>{Comment[id].text}</p>

                  <hr />
                </div>
              )
            } else {
              return (
                <div key={index}>
                  <div>
                    <img style={{ borderRadius: "50%", width: "50px" }} src={Comment[id].uImg} /> <a style={{ fontSize: "1vw", marginLeft: "10px" }}>{Comment[id].uName}</a>
                  </div>
                  <p style={{ marginTop: "2%" }}>{Comment[id].text}</p>
                  <hr />
                </div>
              )
            }
          })
        ) : (
          <div>
            <p>ไม่มีความคิดเห็น...</p>
          </div>
        )}
        {user ? (
          <InputGroup className="mb-3">
            <FormControl placeholder="แสดงความคิดเห็น..." aria-describedby="basic-addon2" value={TextCom} onChange={e => setTextCom(e.target.value)} />
            <Button variant="outline-success" id="button-addon2" onClick={() => btnCommentThesis()}>
              <AiIcons.AiOutlineSend className="me-3" /> ส่ง
            </Button>
          </InputGroup>
        ) : ""}
      </div>
    </div>
  );
}
export default ViewThesis;
