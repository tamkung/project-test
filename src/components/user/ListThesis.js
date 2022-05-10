import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { useParams } from "react-router-dom";
import { firebaseDB, firebase } from "../../services/firebase";
import { Card } from "react-bootstrap";
import { ImBooks } from "react-icons/im";
import { Dropdown } from 'react-bootstrap';
import Search from "./Search";
import * as FiIcons from 'react-icons/fi';
import * as AiIcons from 'react-icons/ai';
import * as BsIcons from 'react-icons/bs';
import * as BiIcons from 'react-icons/bi';
import * as GiIcons from 'react-icons/gi';
import * as MdIcons from 'react-icons/md';
import * as SiIcons from 'react-icons/si';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';

function ListThesis() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  const [values, setValues] = useState({});
  // const [sortedData, setSortedData] = useState([]);
  // const [sort, setSort] = useState(false);

  useEffect(() => {
    firebaseDB.child("Thesis").orderByChild("ThesisAllow").equalTo(true).on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setValues({ ...snapshot.val() });
      } else {
        setValues({});
      }
    });

    return () => {
      setValues({});
    };
  }, []);

  return (
    <div className="container " style={{ width: "100%", textAlign: "center", marginTop: "1%" }} >
      {user ? (
        <div className="row" style={{ width: "100%", borderRadius: "30px 30px 30px 30px", margin: "2%" }}>
          <div className="col-lg" style={{ textAlign: "center" }}>
          <input type="search"/>
            <Dropdown className="btn">
              <Dropdown.Toggle variant="transprent">
                <BsIcons.BsFilter size={25} /> เลือกประเภท
              </Dropdown.Toggle>
              <Dropdown.Menu style={{ width: "93%", background: '#FDF5E6', height: "250px", alignItems: "center", boxShadow: "0px 1px 5px black" }}>
                <Dropdown.Item className="btn drop-item" style={{ textAlign: "left" }}>
                  <MdIcons.MdOutlineWebAsset style={{ margin: "2px" }} size={20} /> เว็บไซต์
                </Dropdown.Item>
                <Dropdown.Item className="btn drop-item" style={{ textAlign: "left" }}>
                  <BiIcons.BiMobileAlt style={{ margin: "2px" }} size={20} /> แอปพลิเคชัน
                </Dropdown.Item>
                <Dropdown.Item className="btn drop-item" style={{ textAlign: "left" }}>
                  <GiIcons.GiSolarPower style={{ margin: "2px" }} size={20} /> อุปกรณ์
                </Dropdown.Item>
                <Dropdown.Item className="btn drop-item" style={{ textAlign: "left" }}>
                  <FiIcons.FiMonitor style={{ margin: "2px" }} size={20} /> สื่อการสอน
                </Dropdown.Item>
                <Dropdown.Item className="btn drop-item" style={{ textAlign: "left" }}>
                  <BiIcons.BiGame style={{ margin: "2px" }} size={20} /> เกม
                </Dropdown.Item>
                <Dropdown.Item className="btn drop-item" style={{ textAlign: "left" }}>
                  <SiIcons.SiIngress style={{ margin: "2px" }} size={20} /> VR AR MR
                </Dropdown.Item>
                <Dropdown.Item className="btn drop-item" style={{ textAlign: "left" }}>
                  <BsIcons.BsThreeDots style={{ margin: "2px" }} size={20} /> อื่นๆ
                </Dropdown.Item>
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

      ) : (
        <div></div>
      )}
      <br />
      <div className="container" style={{ textAlign: "center" }} >
        <div className="row" style={{ position: "relative", paddingLeft:"10%",width: "100%" }} >
          {Object.keys(values).map((id, index) => {
            return (

              <div key={index} className="col-sm-3">
                <Card className="btn select-thesis"
                  onClick={() =>
                    (
                    window.location.href = `/view-thesis/${id}`, 
                    firebaseDB.child("Thesis").child(id).update({View:values[id].View+1})
                    )}
                  style={{ maxHeight: "350px", minHeight: "200px", minWidth: "250px", maxWidth: "250px", padding: "1%", marginBottom: "50px", boxShadow: "1px 1px 4px lightgray" }}
                >
                  <div className="tag-icon" style={{ borderRadius: "8px", background: "#EA7676", position: "absolute", top: "60%", left: "3%", zIndex: "9999", padding: "3px", fontSize: "15px", width: "40px" }} >
                    <div>
                      <AiIcons.AiOutlineEye /> {values[id].View}
                    </div>
                  </div>
                  <div className="tag-icon" style={{ borderRadius: "8px", background: "#5CC7F0", position: "absolute", top: "60%", left: "20%", zIndex: "9999", padding: "3px", fontSize: "15px", width: "40px" }} >
                    <div>
                      <AiIcons.AiOutlineLike /> {values[id].Like.length}
                    </div>
                  </div>
                  <div className="tag-icon" style={{ borderRadius: "8px", background: "#F8DB24", position: "absolute", top: "60%", left: "37%", zIndex: "9999", padding: "3px", fontSize: "15px", width: "40px" }} >
                    <div>
                      <AiIcons.AiOutlineComment /> {values[id].Comment}
                    </div>
                  </div>
                  <div >

                    <img
                      className="show-img card-img-top"
                      alt="Product Images"
                      src={values[id].ThesisImg[0]}
                      style={{ height: "200px", width: "100%" }}
                    />

                  </div>


                  <Card.Body>
                    <Card.Title style={{ fontSize: "1.5vh" }}>{values[id].ThesisName}</Card.Title>
                    <Card.Text>{values[id].ThesisType}</Card.Text>



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
        </div>
      </div>
    </div>
  );
}
export default ListThesis;

{
  /* <table className="table table-sm table-hover">
        <thead>

          <tr>
            <th colspan="4" style={{ textAlign: "center" }}>ปริญญานิพนธ์</th>

            <th style={{ textAlign: "right" }}>
              <Link to={'/AddCollection'}>
                <button className="btn btn-view" style={{ color: 'green' }}><i class="fas fa-plus-circle"></i> Add</button>
              </Link>
            </th>
            <th style={{ textAlign: "center" }}>Status</th>
          </tr>

        </thead>
        <tbody>
          {Object.keys(values).map((id, index) => {
            return (

              <td key={id} className="col-3" >
                <th className="row">
                  <td>
                    <div className="container" >
                      <CardItem
                        src={values[id].ThesisImg}
                        text={values[id].ThesisName}
                        label={values[id].ThesisType}
                        path='#'
                      />
                      <Link to={`/EditThesis/${id}`}>
                        <button className="btn btn-view" style={{ background: "orange", color: "white" }}>Edit</button>
                      </Link>
                      <button
                        className="btn btn-danger"
                        onClick={() => onDelete(id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                  <td>

                  </td>
                </th>
              </td>
            );
          })}
        </tbody>

      </table> */
}
