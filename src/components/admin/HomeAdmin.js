import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col, } from "react-bootstrap";
import { firebaseDB } from "../../services/firebase";
import AdminListThesis from "./AdminListThesis";
import { ThesisType } from "../user/ThesisType"
import { Pie } from 'react-chartjs-2';
function HomeAdmin() {
  const [values, setValues] = useState({});
  const AllThesis = Object.keys(values).map((id) => values[id].ThesisType);
  const WebThesis = AllThesis.filter((AllThesis) => AllThesis == "เว็บไซต์");
  const AppThesis = AllThesis.filter((AllThesis) => AllThesis == "แอปพลิเคชัน");
  const IotThesis = AllThesis.filter((AllThesis) => AllThesis == "อุปกรณ์ iot");
  const GameThesis = AllThesis.filter((AllThesis) => AllThesis == "เกม");
  const TeachThesis = AllThesis.filter((AllThesis) => AllThesis == "สื่อการเรียนรู้");
  const VrThesis = AllThesis.filter((AllThesis) => AllThesis == "VR AR MR");
  const OtherThesis = AllThesis.filter((AllThesis) => AllThesis == "อื่นๆ");
  const AllowThesis = Object.keys(values).map((id) => values[id].ThesisAllow);
  const ValAllowThesis = AllowThesis.filter((AllowThesis) => AllowThesis == true);
  const NotAllowThesis = AllowThesis.filter((AllowThesis) => AllowThesis == false);
  console.log("Allow Thesis\t" + ValAllowThesis.length);
  console.log("Not Allow Thesis\t" + NotAllowThesis.length);
  useEffect(() => {
    firebaseDB.child("Thesis").once("value", (snapshot) => {
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
    <div className="container mt-3">
      <div className="flexbox" style={{ display: "flexbox" }} >
        <div style={{ display: "block", width: "100%" }}>
          <h1>ALL THESIS : {AllThesis.length}</h1>
        </div>
        <div style={{ width: "20%", display: "block", maxWidth: "50%", padding: "10px" }}>
          <Card style={{ backgroundImage: "linear-gradient(to right, #DEDEDE, #CECECE)" }}>
            <Card.Body className="mx-auto text-center" >
              <Card.Title> {WebThesis.length} </Card.Title>
            </Card.Body>
            <Card.Footer className="text-right">
              <Card.Text style={{ whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}> เว็บไซต์ </Card.Text>
            </Card.Footer>
          </Card>
        </div>
        <div style={{ width: "20%", display: "block", maxWidth: "50%", padding: "10px" }}>
          <Card style={{ backgroundImage: "linear-gradient(to right, #DEDEDE, #CECECE)" }}>
            <Card.Body className="mx-auto text-center">
              <Card.Title> {AppThesis.length} </Card.Title>
            </Card.Body>
            <Card.Footer className="text-right">
              <Card.Text style={{ whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}> แอปพลิเคชัน </Card.Text>
            </Card.Footer>
          </Card>
        </div>
        <div style={{ width: "20%", display: "block", maxWidth: "50%", padding: "10px" }}>
          <Card style={{ backgroundImage: "linear-gradient(to right, #DEDEDE, #CECECE)" }}>
            <Card.Body className="mx-auto text-center">
              <Card.Title> {IotThesis.length} </Card.Title>
            </Card.Body>
            <Card.Footer className="text-right">
              <Card.Text style={{ whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}> อุปกรณ์ Iot </Card.Text>
            </Card.Footer>
          </Card>
        </div>
        <div style={{ width: "20%", display: "block", maxWidth: "50%", padding: "10px" }}>
          <Card style={{ backgroundImage: "linear-gradient(to right, #DEDEDE, #CECECE)" }}>
            <Card.Body className="mx-auto text-center">
              <Card.Title> {TeachThesis.length} </Card.Title>
            </Card.Body>
            <Card.Footer className="text-right">
              <Card.Text style={{ whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}> สื่อการเรียนรู้ </Card.Text>
            </Card.Footer>
          </Card>
        </div>
        <div style={{ width: "20%", display: "block", maxWidth: "50%", padding: "10px" }}>
          <Card style={{ backgroundImage: "linear-gradient(to right, #DEDEDE, #CECECE)" }}>
            <Card.Body className="mx-auto text-center">
              <Card.Title> {GameThesis.length} </Card.Title>
            </Card.Body>
            <Card.Footer className="text-right">
              <Card.Text style={{ whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}> เกม </Card.Text>
            </Card.Footer>
          </Card>
        </div>
        <div style={{ width: "20%", display: "block", maxWidth: "50%", padding: "10px" }}>
          <Card style={{ backgroundImage: "linear-gradient(to right, #DEDEDE, #CECECE)" }}>
            <Card.Body className="mx-auto text-center">
              <Card.Title> {VrThesis.length} </Card.Title>
            </Card.Body>
            <Card.Footer className="text-right">
              <Card.Text style={{ whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}> VR AR MR </Card.Text>
            </Card.Footer>
          </Card>
        </div>
        <div style={{ width: "20%", display: "block", maxWidth: "50%", padding: "10px" }}>
          <Card style={{ backgroundImage: "linear-gradient(to right, #DEDEDE, #CECECE)" }}>
            <Card.Body className="mx-auto text-center">
              <Card.Title> {OtherThesis.length} </Card.Title>
            </Card.Body>
            <Card.Footer className="text-right">
              <Card.Text style={{ whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}> อื่นๆ </Card.Text>
            </Card.Footer>
          </Card>
        </div>
      </div>






      <Container >
        <Row>
          <h1>List Thesis ( Allowed )</h1>
          <hr />
          <Row className="mt-3 mb-4 p-2">
            <Col>
              <Card style={{ backgroundImage: "linear-gradient(to right, #00DE32, #038905)", color: "white" }}>
                <Card.Body className=" text-center">
                  <Card.Title>{ValAllowThesis.length} </Card.Title>
                </Card.Body>
                <Card.Footer className="text-right">
                  <Card.Text> อนุมัติแล้ว </Card.Text>
                </Card.Footer>
              </Card>
            </Col>
            <Col>
              <Card style={{ backgroundImage: "linear-gradient(to right, #FF6D24, #FF2A00)", color: "white" }}>
                <Card.Body className=" text-center">
                  <Card.Title>{NotAllowThesis.length} </Card.Title>
                </Card.Body>
                <Card.Footer className="text-right">
                  <Card.Text> ยังไม่อนุมัติ </Card.Text>
                </Card.Footer>
              </Card>
            </Col>
          </Row>

          <AdminListThesis />

        </Row>
      </Container>
    </div>
  );
}
export default HomeAdmin;
