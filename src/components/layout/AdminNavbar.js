import React, { useEffect, useState } from "react";
import { firebaseDB } from "../../services/firebase";
import {
  Navbar,
  Container,
  Nav,
  Offcanvas,
} from "react-bootstrap";
import { auth } from "../../services/firebase";
import "../../css/animate.min.css";


function AdminNavbar() {


  const [values, setValues] = useState({});

  const AllowThesis = Object.keys(values).map((id) => values[id].ThesisAllow);
  const NotAllowThesis = AllowThesis.filter((AllowThesis) => AllowThesis == false);


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
    <div >
      <Navbar expand={false} >
        <Container fluid >
          <Navbar.Brand href="/">Admin Manage</Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" placement="end">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">
                Menu
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link className="item-nav-admin" href="/">Home</Nav.Link>
              <Nav.Link className="item-nav-admin d-sm-none d-md-block d-none d-sm-block" href="/admin/report">Report</Nav.Link>
              <Nav.Link className="item-nav-admin" href="/admin/allow">Waited Allow ( {NotAllowThesis.length} )</Nav.Link>
              <Nav.Link className="item-nav-admin" href="/admin/add-thesis">Add Project</Nav.Link>
              <Nav.Link className="item-nav-admin" href="/admin/sign-up">Add Admin</Nav.Link>

              <Nav.Link className="item-nav-admin-logout"  onClick={() => auth.signOut()
                .then(() => {
                  window.location.href = "/";
                })
                .catch((error) => {
                  console.error(error);
                })}>
                <span className="no-icon">Log out</span>
              </Nav.Link>
            </Offcanvas.Body>


          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>
  );
}
export default AdminNavbar;
//
