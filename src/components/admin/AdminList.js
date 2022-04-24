import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { useParams } from "react-router-dom";
import { firebaseDB } from "../../services/firebase";
import { Card, CardImg } from 'react-bootstrap';

import CardHeader from "react-bootstrap/esm/CardHeader";

function AdminList() {
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

      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">
              <Link to={'/admin-add'}>
                <button className="btn btn-view" style={{ color: 'green' }}><i className="fas fa-plus-circle"></i> Add</button>
              </Link>
            </th>
          </tr>
        </thead>
        {Object.keys(values).map((id, index) => {
        return (
            <tbody>
              <tr>
                <td scope="col">{values[id].ThesisName}</td>
                <td scope="col">{values[id].ThesisType}</td>
                <td scope="col">{values[id].DevName1}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => onDelete(id)}
                  >
                    Delete
                  </button>
                  <Link to={`/EditThesis/${id}`}>
                    <button className="btn btn-view" style={{ background: "orange", color: "white" }}>Edit</button>
                  </Link>
                  </td>
              </tr>

            </tbody>



        );
      })}
      </table>


      
    </div>
  )
}
export default AdminList;

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
