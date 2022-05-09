import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { useParams } from "react-router-dom";
import { firebaseDB, firebase } from "../../services/firebase";
import { Card } from "react-bootstrap";
import { ImBooks } from "react-icons/im";
import { Dropdown } from 'react-bootstrap';
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
        <div className="row" style={{ width: "100%", background: "#F5F5F5", borderRadius: "30px 30px 30px 30px", margin: "2%" }}>
          <div className="col-lg" style={{ textAlign: "center" }}>
            <Dropdown className="btn">
              <Dropdown.Toggle variant="transprent">
                <BsIcons.BsFilter size={25} /> เลือกประเภท
              </Dropdown.Toggle>
              <Dropdown.Menu style={{ width: "93%", background: '#FDF5E6', height: "250px", alignItems: "center", border: "0px", boxShadow: "0px 1px 5px black" }}>
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
              <button className="btn btn-outline-success" style={{ borderRadius: "25px 25px 25px 25px", border: "0px", textAlign: "center", maxWidth: "120px", minWidth: "120px" }}>
                <i className="fas fa-plus-circle"></i> &nbsp; Add
              </button>
            </Link>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Link to={"/MyThesis"}>
              <button className="btn btn-outline-primary" style={{ borderRadius: "25px 25px 25px 25px", border: "0px", textAlign: "center", maxWidth: "150px", minWidth: "150px" }}>
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
        <div className="row" style={{ position: "relative", width: "100%" }} >
          {Object.keys(values).map((id, index) => {
            return (
              <div key={index} className="btn col-sm-2" style={{ margin: "0% 5vw 4% 0%", textAlign: "center", position: "relative" }}>
                <Card className="btn select-thesis"
                  onClick={() =>
                    (window.location.href = `/view-thesis/${id}`)
                  }
                  style={{ maxHeight: "500px", minHeight: "200px", minWidth: "250px", maxWidth: "300px", width: "30vw", padding: "1%" }}
                >
                  <div>
                    <img
                      className="show-img card-img-top"
                      alt="Product Images"
                      src={values[id].ThesisImg[0]}
                      style={{ height: "200px", width: "100%" }}
                    />
                  </div>


                  <Card.Body>
                    <Card.Title style={{ fontSize: "2vh" }}>{values[id].ThesisName}</Card.Title>
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
