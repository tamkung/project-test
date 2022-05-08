import React from "react";
import { firebaseDB, firebase } from "../../services/firebase";
import { useEffect, useState } from "react";
import { Card, CardImg, Button } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";

function AdminAllow() {

  const [values, setValues] = useState({});
//   const [check, setCheck] = useState(false);


  useEffect(() => {
    firebaseDB.child("Thesis").orderByChild("ThesisAllow").equalTo(false).on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setValues({ ...snapshot.val() });
        console.log(snapshot.val())
      } else {
        setValues({});
      }
    });

    return () => {
      setValues({});
    };
  }, []);


  const onUpdateAllow = (id) => {
        firebaseDB.child("Thesis").child(id)
        .update( {ThesisAllow: true,}).then(()=>{
            alert("Add Admin success");
        }).catch((error) => {
            console.error(error);
          });
}


  return (
    <div className="container mt-5">
      <h1>อนุมัติ Thesis</h1>
      <hr />
      {Object.keys(values).map((id) => {
        return (
          <div key={id}>
            <Card>
              <Card.Header as="h5">{values[id].ThesisName}</Card.Header>
              <Card.Body>
                <Card.Title>{values[id].ThesisType}</Card.Title>
                <Card.Text>{values[id].ThesisDetails}</Card.Text>
                {/* <Card.Text>{check.toString()}</Card.Text>  */}
                {/* <Button variant="primary" onClick={()=>setCheck((prevCheck) => !prevCheck.value)}>อนุมัติ</Button> */}
                <Button variant="primary" onClick={()=>onUpdateAllow(id)}>อนุมัติ</Button>
              </Card.Body>
            </Card>
            <br />
          </div>
        );
      })}
    </div>
  );
}
export default AdminAllow;
