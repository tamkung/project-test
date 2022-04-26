import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { useParams } from "react-router-dom";
import { firebaseDB, firebase } from "../../services/firebase";
import { Card } from "react-bootstrap";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { ImBooks } from "react-icons/im";

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
    firebaseDB.child("Thesis").on("value", (snapshot) => {
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

  // const onDelete = (id) => {
  //   if (
  //     window.confirm("Are you sure that you wanted to delete that contact ?")
  //   ) {
  //     firebaseDB.child(`Thesis/${id}`).remove((err) => {
  //       if (err) {
  //         console.error(err);
  //       } else {
  //         // colors.log("Contact Deleted Successfully");
  //         console.log("Contact Deleted Successfully");
  //       }
  //     });
  //   }
  // };
  return (
    <div className="container " style={{ width: "100%" }}>
      <hr />
      {user ? (
        <div className="row">
          <div className="col-lg" style={{ textAlign: "right" }}>
            <Link to={"/AddCollection"}>
              <button className="btn btn-success" style={{ color: "white" }}>
                <i className="fas fa-plus-circle"></i> &nbsp; Add
              </button>
            </Link>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Link to={"/MyThesis"}>
              <button className="btn btn-warning" style={{ color: "white" }}>
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

      <div className="container" >
        <div className="row ">
          {Object.keys(values).map((id, index) => {
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
