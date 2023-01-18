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
      <h3 style={{ textAlign: "left"}} >My Project</h3>
      <br />
      <div className="container">
        
      <div className="flexbox">
        {Object.keys(values).map((id, index) => {
          return (
            <div key={index} type="button" className="itemflex">
              {values[id].ThesisAllow ? (
                <Card className="hovercard"
                  onClick={() => (window.location.href = `/view-thesis/${id}`, firebaseDB.child("Thesis").child(id).update({ View: values[id].View + 1 })
                  )} style={{ height: "350px" }}>
                  <div style={{ overflow: "hidden", height: "200px" }}><img className="show-img card-img-top" style={{ height: "100%", width: "auto" }} alt="Thesis Images" src={values[id].ThesisImg[0]} /></div>
                  <div style={{ padding: "10px", paddingTop: "30px" }}>
                    <Card.Title style={{ fontWeight: "bold", height: "30px", fontSize: "16px", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>{values[id].ThesisName}</Card.Title>
                    <Card.Text style={{ height: "10px", fontSize: "12px" }} > {values[id].ThesisType}</Card.Text>
                    <AiIcons.AiOutlineEye /> {values[id].View} &nbsp;&nbsp;&nbsp;&nbsp;
                    {values[id].Like ? (<>
                      <AiIcons.AiOutlineLike /> {values[id].Like.length}</>) : (<>
                        <AiIcons.AiOutlineLike /> 0 </>)}
                  </div>
                </Card>
              ) : (<></>)}
            </div>
          );
        })}

      </div>
      </div>
    </div>
  );
}
export default MyThesis;
