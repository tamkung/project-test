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
  const [type, setType] = useState("");

  const [year, setYear] = useState(""); // ปีที่เลือก

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  const [values, setValues] = useState({});
  useEffect(() => {
    if (type !== "") {
      firebaseDB
        .child("Thesis")
        .orderByChild("ThesisType")
        .equalTo(type)
        .once("value", (snapshot) => {
          // productCategory
          if (snapshot.val() !== null) {
            setValues({ ...snapshot.val() });
            console.log(snapshot.val());
          } else {
            setValues({});
          }
        });
    } else {
      firebaseDB
        .child("Thesis")
        .orderByChild("ThesisAllow")
        .equalTo(true)
        .once("value", (snapshot) => {
          if (snapshot.val() !== null) {
            setValues({ ...snapshot.val() });
            console.log(snapshot.val());
          } else {
            setValues({});
          }
        });
    }

    return () => {
      setValues({});
    };
  }, [type]);

  const searchYear = () => {
    console.log(year);

    if (year !== "") {
      try {
        firebaseDB
          .child("Thesis")
          .orderByChild("year") // ใช้ orderByChild เพราะเราจะเรียงตาม year
          .equalTo(year) // ใช้ equalTo เพราะเราจะเรียงตาม year
          .once("value", (snapshot) => {
            // productCategory
            if (snapshot.val() !== null) {
              setValues({ ...snapshot.val() });
              console.log(snapshot.val());
            } else {
              setValues({});
            }
          });
      } catch (error) {
        console.error(error);
        firebaseDB
          .child("Thesis")
          .orderByChild("ThesisAllow")
          .equalTo(true)
          .once("value", (snapshot) => {
            if (snapshot.val() !== null) {
              setValues({ ...snapshot.val() });
              console.log(snapshot.val());
            } else {
              setValues({});
            }
          });
      }
    } else {
      firebaseDB
        .child("Thesis")
        .orderByChild("ThesisAllow")
        .equalTo(true)
        .once("value", (snapshot) => {
          if (snapshot.val() !== null) {
            setValues({ ...snapshot.val() });
            console.log(snapshot.val());
          } else {
            setValues({});
          }
        });
    }
  };

  const handleInputChange = (e) => {
    setYear(parseInt(e.target.value));
    console.log(e.target.value);
  };

  // console.log(type);

  // console.log("Type : ", type)
  return (
    <div className="container " style={{ width: "100%", textAlign: "center", marginTop: "1%" }} >
      {user ? (
        <div className="row" style={{ width: "100%", borderRadius: "30px 30px 30px 30px", margin: "2%" }}>
          <div className="col-lg" style={{ textAlign: "center" }}>
            <Link to={"/AddCollection"}>
              <button className="btn btn-outline-success" style={{ borderRadius: "15px", border: "0px", textAlign: "center", maxWidth: "120px", minWidth: "120px" }}>
                <i className="fas fa-plus-circle"></i> &nbsp; Add
              </button>
            </Link>

            <Link to={"/MyThesis"}>
              <button className="btn btn-outline-primary" style={{ borderRadius: "15px", border: "0px", textAlign: "center", maxWidth: "150px", minWidth: "150px" }}>
                <ImBooks style={{ fontSize: "150%" }} />
                &nbsp; My Project
              </button>
            </Link>
          </div>
        </div>
      ) : ("")}

      <br />
      <div style={{ width: "auto" }} className='flex'>
        <select
          aria-label="Default select example"
          id="ThesisType"
          name="ThesisType"
          className="form-select"
          required
          style={{ marginBottom: "20px", width: "auto" }}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">ประเภท</option>
          {ThesisType.map((item, keys) => {
            return (
              <option name="ThesisType" key={keys} value={item.title}>
                {item.title}
              </option>
            );
          })}
        </select>
        <div className="mb-3 flex">
          <input type="number" placeholder="Search" onChange={handleInputChange} />
          <button class="btn btn-outline-secondary" type="submit" onClick={searchYear}>Search</button>
        </div>
      </div>

      <div className="flexbox" >
        {Object.keys(values).map((id, index) => {
          console.log("length : " + JSON.stringify(values));
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
                    <Card.Text style={{ height: "10px", fontSize: "12px" }} > {values[id].year}</Card.Text>
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
  );
}
export default ListThesis;