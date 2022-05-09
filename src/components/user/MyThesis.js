import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { useParams } from "react-router-dom";
import { firebaseDB, firebase } from "../../services/firebase";
import { Card, CardImg } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import * as FaIcons from 'react-icons/fa';
import * as FiIcons from 'react-icons/fi';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as BsIcons from 'react-icons/bs';
import * as BiIcons from 'react-icons/bi';
import * as ImIcons from 'react-icons/im';
import * as GiIcons from 'react-icons/gi';
import * as WiIcons from 'react-icons/wi';
import * as MdIcons from 'react-icons/md';
import * as GoIcons from 'react-icons/go';
import * as GrIcons from 'react-icons/gr';
import * as HiIcons from 'react-icons/hi';
import * as RiIcons from 'react-icons/ri';
import * as SiIcons from 'react-icons/si';
import * as TiIcons from 'react-icons/ti';

function MyThesis() {
  const [values, setValues] = useState({});

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      firebaseDB
        .child("Thesis")
        .orderByChild("UserId")
        .equalTo(user.uid.toString())
        .on("value", (snapshot) => {
          if (snapshot.val() !== null) {
            setValues({ ...snapshot.val() });
            console.log(user.uid);
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
    <div className="container" style={{ textAlign: "center", marginTop: "20px" }}>

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
                <div key={id} className="btn col-md-4" style={{ margin: "0% 5% 5% 0%", textAlign: "center", maxWidth: "250px" }}>
                  <Card className="btn select-thesis "
                    onClick={() =>
                      (window.location.href = `/view-thesis/${id}`)
                    }
                    style={{ background: "red", height: "350px", minWidth: "250px", maxWidth: "250px", padding: "1%" }}
                  >
                    <div style={{ height: "300px" }}>
                      <img
                        id="imgShow"
                        className="card-img-top"
                        // style="height:200px;"
                        style={{ height: "200px", width: "100%" }}
                        alt="Product Images"
                        src={values[id].ThesisImg[0]}
                      // onClick="#"
                      />
                    </div>

                    <Card.Body style={{ background: "blue", height: "200px", minWidth: "250px", maxWidth: "250px", padding: "10px" }}>
                      <Card.Title>{values[id].ThesisName}</Card.Title>
                      <Card.Text>{values[id].ThesisType}</Card.Text>
                      <AiIcons.AiOutlineLike /> {values[id].Like}
                    </Card.Body>
                  </Card>
                  {/* <Card style={{ height: "200px" }} onClick={() =>  window.location.href=`/viewcollection/${id}`}> */}

                  {/* <Card.Body> */}

                  {/* <AiOutlineEye /> {values[id].Share} */}
                  {/* <Card.Title>{values[id].ThesisName}</Card.Title> */}

                  {/* <Card.Text>{values[id].ThesisType}</Card.Text> */}
                  {/* <AiOutlineLike /> {values[id].Like} */}
                  {/* </Card.Body> */}

                  {/* </Card> */}
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
export default MyThesis;
