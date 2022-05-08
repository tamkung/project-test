import React from "react";
// import { useLocation } from "react-router-dom";
import {
  Navbar,
  Container,
  Nav,
  Offcanvas,
} from "react-bootstrap";
import { auth } from "../../services/firebase";
import "../../css/animate.min.css";


function AdminNavbar() {
  return (
    <div>
      <Navbar bg="secondary" expand={false}>
        <Container fluid>
          <Navbar.Brand href="/">Admin Thesis</Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">
                Manu
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="justify-content-end flex-grow-1 pe-3">
             
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/admin/report">Report</Nav.Link>
                <Nav.Link href="/admin/allow">Allow</Nav.Link>
          
            </Offcanvas.Body>
          
            <Nav.Link
                  className="m-0"
                  href=""
                  onClick={() =>
                    auth
                      .signOut()
                      .then(() => {
                        window.location.href = "/";
                      })
                      .catch((error) => {
                        console.error(error);
                      })
                  }
                >
                  <span className="no-icon">Log out</span>
                </Nav.Link>
        
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>
  );
}
export default AdminNavbar;
//
