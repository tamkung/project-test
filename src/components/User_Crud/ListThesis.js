import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { useParams } from "react-router-dom";
import { firebaseDB } from "../../services/firebase";
import { Card, CardImg } from 'react-bootstrap';
import CardHeader from "react-bootstrap/esm/CardHeader";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";

function ListThesis() {
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
    },
    )

    return () => {
      setValues({});
    };
  }, []);

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
    <div className="container">
      <div className="row">
        <div className="col-lg">
          <Link to={'/AddCollection'}>
            <button className="btn" style={{ color: 'green' }}><i className="fas fa-plus-circle"></i> Add</button>
          </Link>
        </div>
      </div>
      <hr />
      <div className="container">
        <div className="row">
          {Object.keys(values).map((id) => {
            return (
              <div key={id} className="col-lg-3" >
                <Card>
                  <CardHeader>
                  <AiOutlineEye/> {values[id].Share}
                    <Card.Title>{values[id].ThesisName}</Card.Title>
                  </CardHeader>
                  <Card.Body>
                    <Card.Text>{values[id].ThesisType}</Card.Text>
                    <AiOutlineLike/> {values[id].Like}
                  </Card.Body>
                </Card>
                <br />
              </div>
            );
          })}
        </div>
      </div>


    </div>
  );
}
export default ListThesis;

{/* <table className="table table-sm table-hover">
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

      </table> */}
