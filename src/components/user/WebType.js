import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { useParams } from "react-router-dom";
import { firebaseDB, firebase } from "../../services/firebase";
import { Card, CardImg } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { ImBooks } from "react-icons/im";
import { colors } from "@material-ui/core";

function WebType() {
  const [values, setValues] = useState({});

  useEffect(() => {
    firebase.auth().onAuthStateChanged(() => {
      firebaseDB
      .child("Thesis")
      .orderByChild("ThesisType")
      .equalTo("Iot")
      .on("value", (snapshot) => {
        if (snapshot.val() !== null) {
          setValues({ ...snapshot.val() });
          
        } else {
          setValues({});
        }
      });
  
      return () => {
        setValues({});
      };
     
    });
  }, []);

  
  // //   const [uid,setUid]=useState();
  // useEffect(() => {
  //   firebaseDB
  //     .child("Thesis")
  //     .orderByChild("ThesisType")
  //     .equalTo('เว็บไซต์')
  //     .on("value", (snapshot) => {
  //       if (snapshot.val() !== null) {
  //         setValues({ ...snapshot.val() });
  //         console.log(userId);
  //       } else {
  //         setValues({});
  //       }
  //     });
  
  //     return () => {
  //       setValues({});
  //     };
  // }, []);

  const onDelete = (id) => {
    if (
      window.confirm("Are you sure that you wanted to delete that contact ?")
    ) {
      firebaseDB.child(`Thesis/${id}`).remove((err) => {
        if (err) {
          console.error(err);
        } else {
          // colors.log("Contact Deleted Successfully");
          console.log("Contact Deleted Successfully");
        }
      });
    }
  };

  return (
    <div className="container" style={{textAlign:"center" , marginTop:"20px"}}>

      <div className="row">
        <div className="col-lg" style={{ textAlign: "right" }}>
          <Link to={"/AddCollection"}>
            <button className="btn btn-success" style={{ color: "white" }}>
              <i className="fas fa-plus-circle"></i> &nbsp; Add
            </button>
          </Link>
        </div>
      </div>

      <br />
      <div className="container">
        <div className="row">
          {
            Object.keys(values).map((id) => {
              return (
                <div key={id} className="btn col-md-3" style={{ margin: "0% 0% 2% 0%" , textAlign:"center" }}>
                  <Card className="btn select-thesis "
                    onClick={() =>
                      (window.location.href = `/viewcollection/${id}`)
                    }
                    style={{ height: "350px", width: "300px", padding: "0" }}
  
                  >
                    <img
                      id="imgShow"
                      className="card-img-top"
                      // style="height:200px;"
                      style={{ height: "200px", width: "100%" }}
                      alt="Product Images"
                      src={values[id].ThesisImg[0]}
                    // onClick="#"
                    />
                    <Card.Body >
                      <Card.Title>{values[id].ThesisName}</Card.Title>
                      <Card.Text>{values[id].ThesisType}</Card.Text>
                      <AiOutlineLike /> {values[id].Like}
                    </Card.Body>
                  </Card>
                </div>
             );
            })}

          {/* {Object.keys(values).map((id) => {
            if (values[id].UserId == user) {
              return (
                <div key={id} className="col-lg-3">
                  <Card style={{ height: "200px" }}>
                    <CardHeader style={{ height: "150px" }}>
                      <AiOutlineEye /> {values[id].UserId}
                      <Card.Title>{values[id].ThesisName}</Card.Title>
                    </CardHeader>
                    <Card.Body>
                      <Card.Text>{values[id].ThesisType}</Card.Text>
                      <AiOutlineLike /> {values[id].Like}
                    </Card.Body>
                  </Card>
                  <br />
                </div>
              );
            } else {
              return (
                <div className="container">
                  <h1>not thesis</h1>
                </div>
              );
            }
          })} */}
        </div>
      </div>
    </div>
  );
}
export default WebType;
