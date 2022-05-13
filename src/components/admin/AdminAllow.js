import React from "react";
import { firebaseDB, firebase } from "../../services/firebase";
import { useEffect, useState } from "react";
import { Card, CardImg, Button } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { Divider } from "@mui/material";

function AdminAllow() {

  const [values, setValues] = useState({});
  //   const [check, setCheck] = useState(false);
  // const [Images, setImages] = useState([]);

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
      .update({ ThesisAllow: true, }).then(() => {
        alert("Add Admin success");
      }).catch((error) => {
        console.error(error);
      });
  }


  return (
    <div className="container mt-5">
      <h1>อนุมัติ Thesis</h1>
      <hr />
      {Object.keys(values).map((id, i) => {
        return (
          <div key={i}>
            <Card>
              <Card.Header style={{ fontSize: "1vw" }}  > <img src={values[id].DevPhoto} style={{ borderRadius: "50%", width: "50px", height: "50px", marginRight: "10px" }} /> {values[id].Email} </Card.Header>
              <Card.Body>
                <Card.Title>ชื่อ : {values[id].ThesisName}</Card.Title>
                <Card.Text>ประเภท : {values[id].ThesisType}</Card.Text>
                <Card.Text>เจ้าของ : {values[id].DevName1}  {values[id].DevName2}</Card.Text>
                <div className="row">
                  {values[id].ThesisImg.map((url, i) => (
                    <div className="col" interval={3000} key={i}>
                      <img
                        src={url}
                        alt="First slide"
                        style={{
                          height: "200px",
                          textAlign: "center",
                          margin: "1%"
                        }}

                      />
                    </div>
                  ))}

                </div>

                <Card.Text>{values[id].ThesisDetails}</Card.Text>
                <div className="row">
                  <div className="col">
                    <Button href={values[id].ThesisFile[0]} target="_blank">File</Button>
                    {/* <Button target="_blank" style={{ margin: "5px" }} onClick={() => (
                      (window.location.href = `${values[id].ThesisFile[0]}`, "_blank"))}> File </Button> */}
                  </div>
                  <div className="col" style={{ textAlign: "right" }}>
                    <Button style={{ margin: "5px" }} variant="primary" onClick={() => onUpdateAllow(id)}>อนุมัติ</Button>
                    <Button className="btn-danger" style={{ margin: "5px" }} variant="primary" onClick={() => onUpdateAllow(id)}>ไม่อนุมัติ</Button>
                  </div>
                </div>

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
