import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { firebaseDB, firebase } from "../../services/firebase";
import { Card } from "react-bootstrap";
import { ImBooks } from "react-icons/im";
import { Dropdown } from 'react-bootstrap';
import { ThesisType } from "../user/ThesisType";
import * as FiIcons from 'react-icons/fi';
import * as AiIcons from 'react-icons/ai';
import * as BsIcons from 'react-icons/bs';
import * as BiIcons from 'react-icons/bi';
import * as GiIcons from 'react-icons/gi';
import * as MdIcons from 'react-icons/md';
import * as SiIcons from 'react-icons/si';
function ListThesis() {
  const [user, setUser] = useState(null);
  const [type, setType] = useState(null);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  const [values, setValues] = useState({});
  useEffect(() => {
    if(type !== null){
      firebaseDB.child("Thesis").orderByChild("ThesisType").equalTo(type).on("value", (snapshot) => {
        if (snapshot.val() !== null) {
          setValues({ ...snapshot.val() });
        } else {
          setValues({});
        }
      });

    }else{
      firebaseDB.child("Thesis").orderByChild("ThesisAllow").equalTo(true).on("value", (snapshot) => {
        if (snapshot.val() !== null) {
          setValues({ ...snapshot.val() });
        } else {
          setValues({});
        }
      });
    }

    // return () => {
    //   setValues({});
    // };
  }, [type]);


  console.log("Type : ", type)
  return (
    <div className="container " style={{ width: "100%", textAlign: "center", marginTop: "1%" }} >
      {user ? (
        <div className="row" style={{ width: "100%", borderRadius: "30px 30px 30px 30px", margin: "2%" }}>
          <div className="col-lg" style={{ textAlign: "center" }}>
            <Dropdown className="btn" onChange={e => setType(e.target.values)}>
              <Dropdown.Toggle variant="transprent">
                <BsIcons.BsFilter size={25} /> เลือกประเภท
              </Dropdown.Toggle>
              <Dropdown.Menu style={{ width: "93%", background: '#FDF5E6', alignItems: "center", boxShadow: "0px 1px 5px black" }}>
                {ThesisType.map((item, index) => {
                  return (
                    // <Dropdown.Item key={index} className="btn drop-item" style={{ textAlign: "left" }} onClick={() => window.location = (item.path)}>
                    <Dropdown.Item key={index} className="btn drop-item" style={{ textAlign: "left" }} onClick={() => setType(item.title)}>
                      {item.icons} {item.title}
                    </Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
            <Link to={"/AddCollection"}>
              <button className="btn btn-outline-success" style={{ borderRadius: "15px", border: "0px", textAlign: "center", maxWidth: "120px", minWidth: "120px" }}>
                <i className="fas fa-plus-circle"></i> &nbsp; Add
              </button>
            </Link>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Link to={"/MyThesis"}>
              <button className="btn btn-outline-primary" style={{ borderRadius: "15px", border: "0px", textAlign: "center", maxWidth: "150px", minWidth: "150px" }}>
                <ImBooks style={{ fontSize: "150%" }} />
                &nbsp; My Thesis
              </button>
            </Link>
          </div>
        </div>
      ) : ("")}<br />
      {/* <div className="flex" style={{ textAlign: "center" }} >
        <div style={{ paddingLeft: "1%", width: "100%" }} >
          {Object.keys(values).map((id, index) => {
            return (
              <div key={index} >
                <Card className="select-thesis flex-item "
                  onClick={() => (window.location.href = `/view-thesis/${id}`, firebaseDB.child("Thesis").child(id).update({ View: values[id].View + 1 })
                  )} style={{ maxHeight: "500px", minHeight: "450px", minWidth: "250px", maxWidth: "250px", padding: "1%", marginBottom: "50px", boxShadow: "1px 1px 4px lightgray" }} >
                  <div style={{ position: "absolute", top: "5%" }} >
                    <div style={{ boxShadow: "2px 2px 3px black", border: " 2px black solid ", borderRadius: "8px", background: "white", left: "3%", zIndex: "9999", padding: "3px", fontSize: "15px", marginLeft: "5px", width: "50px" }} >
                      <div>
                        <AiIcons.AiOutlineEye /> {values[id].View}
                      </div>
                    </div>
                    <div className="col" style={{ boxShadow: "2px 2px 3px black", border: " 2px black solid ", borderRadius: "8px", background: "white", left: "20%", zIndex: "9999", padding: "3px", fontSize: "15px", marginLeft: "5px", width: "50px" }} >
                      <div>
                        {values[id].Like ? (<>
                          <AiIcons.AiOutlineLike /> {values[id].Like.length}</>) : (<>
                            <AiIcons.AiOutlineLike /> 0</>)}
                      </div>
                    </div>
                  </div>
                  <div><img className="show-img card-img-top" alt="Thesis Images" src={values[id].ThesisImg[0]} style={{ height: "300px", width: "100%" }} /></div>
                  <Card.Body>
                    <Card.Title style={{ fontSize: "1.5vh" }}>{values[id].ThesisName}</Card.Title>
                    <Card.Text>{values[id].ThesisType}</Card.Text>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
        </div>
      </div> */}

      {/* <div className="flex">
        <div  >
          {Object.keys(values).map((id, index) => {
            return (
              <div className="flex-item">
                <Card key={index} >
                  <img src={values[id].ThesisImg[0]} />
                  <Card.Body>
                    <Card.Title>{values[id].ThesisName}</Card.Title>
                    <Card.Text>{values[id].ThesisType}</Card.Text>
                  </Card.Body>
                </Card>
              </div>
            );

          })}
        </div>
      </div> */}

      <div className="flexbox">
        {Object.keys(values).map((id, index) => {
          return (
            <div key={index} type="button" className="itemflex">
              <Card className="hovercard"
                onClick={() => (window.location.href = `/view-thesis/${id}`, firebaseDB.child("Thesis").child(id).update({ View: values[id].View + 1 })
                )} style={{ height: "450px" }}>
                <div style={{ overflow: "hidden", height: "300px" }}><img className="show-img card-img-top" style={{ height: "100%", width: "auto" }} alt="Thesis Images" src={values[id].ThesisImg[0]} /></div>
                <div style={{ padding: "10px", paddingTop: "30px" }}>
                  <Card.Title style={{ fontWeight: "bold", height: "30px", fontSize: "16px", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>{values[id].ThesisName}</Card.Title>
                  <Card.Text style={{ height: "10px", fontSize: "12px" }} > {values[id].ThesisType}</Card.Text>
                  <AiIcons.AiOutlineEye /> {values[id].View} &nbsp;&nbsp;&nbsp;&nbsp;
                  {values[id].Like ? (<>
                    <AiIcons.AiOutlineLike /> {values[id].Like.length}</>) : (<>
                      <AiIcons.AiOutlineLike /> 0 </>)}

                </div>
              </Card>
            </div>
          );
        })}

      </div>

    </div>
  );
}
export default ListThesis;