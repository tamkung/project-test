import React, { useEffect, useState } from "react";

import {Card,Container,Row,Col,} from "react-bootstrap";
import { firebaseDB } from "../../services/firebase";
import AdminListThesis from "./AdminListThesis";

function HomeAdmin() {
  const [values, setValues] = useState({});

  const AllThesis = Object.keys(values).map((id) => values[id].ThesisType);
  const WebThesis = AllThesis.filter((AllThesis) => AllThesis == "Website");
  const AppThesis = AllThesis.filter((AllThesis) => AllThesis == "Application");
  const IotThesis = AllThesis.filter((AllThesis) => AllThesis == "Iot");
  const GameThesis = AllThesis.filter((AllThesis) => AllThesis == "Game");
  const TeachThesis = AllThesis.filter((AllThesis) => AllThesis == "Media");
  const VrThesis = AllThesis.filter((AllThesis) => AllThesis == "VR AR MR");
  const OtherThesis = AllThesis.filter((AllThesis) => AllThesis == "other");

  const AllowThesis = Object.keys(values).map((id) => values[id].ThesisAllow);
  const ValAllowThesis = AllowThesis.filter((AllowThesis)=>AllowThesis == true);
  const NotAllowThesis = AllowThesis.filter((AllowThesis)=>AllowThesis == false);

  // console.log(values);
  // console.log(AllThesis);
  console.log("Allow Thesis\t" + ValAllowThesis.length);
  console.log("Not Allow Thesis\t" + NotAllowThesis.length);
  // console.log("Web Thesis\t" + WebThesis.length);
  // console.log("App Thesis\t" + AppThesis.length);
  // console.log("Iot Thesis\t" + IotThesis.length);
  // console.log("Game Thesis\t" + GameThesis.length);
  // console.log("Teach Thesis\t" + TeachThesis.length);
  // console.log("VR Thesis\t" + VrThesis.length);
  // console.log("Other Thesis\t" + OtherThesis.length);

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
      <Container fluid>
        <Row>
          <Col lg="4">
            <Card style={{ height: "15rem" }}>
              <Card.Body className="mx-auto text-center">
                <Card.Text> ALL THESIS </Card.Text>
                <Card.Title>{AllThesis.length} </Card.Title>
              </Card.Body>
              <Card.Footer className="text-right">
                <Card.Text> ALL </Card.Text>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="8">
            <Row className="m-2">
              <Col>
                <Card>
                  <Card.Body className="mx-auto text-center">
                    <Card.Title> {WebThesis.length} </Card.Title>
                  </Card.Body>
                  <Card.Footer className="text-right">
                    <Card.Text> เว็บไซต์ </Card.Text>
                  </Card.Footer>
                </Card>
              </Col>
              <Col>
                <Card>
                  <Card.Body className="mx-auto text-center">
                    <Card.Title> {AppThesis.length} </Card.Title>
                  </Card.Body>
                  <Card.Footer className="text-right">
                    <Card.Text> แอปพลิเคชัน </Card.Text>
                  </Card.Footer>
                </Card>
              </Col>
              <Col>
                <Card>
                  <Card.Body className="mx-auto text-center">
                    <Card.Title> {IotThesis.length} </Card.Title>
                  </Card.Body>
                  <Card.Footer className="text-right">
                    <Card.Text> อุปกรณ์ Iot </Card.Text>
                  </Card.Footer>
                </Card>
              </Col>
              <Col>
                <Card>
                  <Card.Body className="mx-auto text-center">
                    <Card.Title> {TeachThesis.length} </Card.Title>
                  </Card.Body>
                  <Card.Footer className="text-right">
                    <Card.Text> สื่อการสอน </Card.Text>
                  </Card.Footer>
                </Card>
              </Col>
            </Row>
            <Row className="m-2">
              <Col>
                <Card>
                  <Card.Body className="mx-auto text-center">
                    <Card.Title> {GameThesis.length} </Card.Title>
                  </Card.Body>
                  <Card.Footer className="text-right">
                    <Card.Text> เกม </Card.Text>
                  </Card.Footer>
                </Card>
              </Col>
              <Col>
                <Card>
                  <Card.Body className="mx-auto text-center">
                    <Card.Title> {VrThesis.length} </Card.Title>
                  </Card.Body>
                  <Card.Footer className="text-right">
                    <Card.Text> VR AR MR </Card.Text>
                  </Card.Footer>
                </Card>
              </Col>
              <Col>
                <Card>
                  <Card.Body className="mx-auto text-center">
                    <Card.Title>{OtherThesis.length} </Card.Title>
                  </Card.Body>
                  <Card.Footer className="text-right">
                    <Card.Text> อื่นๆ </Card.Text>
                  </Card.Footer>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="mt-3 p-2">
        <Col>
                <Card>
                  <Card.Body className=" text-center">
                    <Card.Title>{ValAllowThesis.length} </Card.Title>
                  </Card.Body>
                  <Card.Footer className="text-right">
                    <Card.Text> อนุมัติแล้ว </Card.Text>
                  </Card.Footer>
                </Card>
              </Col>
              <Col>
                <Card>
                  <Card.Body className=" text-center">
                    <Card.Title>{NotAllowThesis.length} </Card.Title>
                  </Card.Body>
                  <Card.Footer className="text-right">
                    <Card.Text> ยังไม่อนุมัติ </Card.Text>
                  </Card.Footer>
                </Card>
              </Col>
        </Row>
      </Container>
      <Container >
        <Row>
          <h1>List Thesis ( Allowed )</h1>
          <hr/>
          <AdminListThesis />
          
        </Row>
      </Container>
    </div>
  );
}
export default HomeAdmin;
