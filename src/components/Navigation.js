import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import logo from "../icons/logo.png";
import { Offcanvas } from "react-bootstrap";

export const Navigation = () => {
  const location = useLocation();

  return (
    <>
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        style={{
          height: "8%",
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-end",
          paddingBottom: "0",
        }}
      >
        <Navbar.Brand
          as={Link}
          to="/"
          style={{
            alignItems: "center",
          }}
        >
          <img src={logo} alt="brain logo" width="30" height="30" />
          Second Brain
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="offCanvasDisplay" />
        <Navbar.Offcanvas id="offCanvasDisplay" placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Second Brain</Offcanvas.Title>
          </Offcanvas.Header>
          <Nav
            justify="true"
            activeKey={location.pathname} //activekey updates each time location.pathname changes (vs defaultActiveKey)
            variant="tabs"
          >
            <Nav.Item>
              <Nav.Link as={Link} to="/home" eventKey="/">
                Home
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/booksearch" eventKey="/booksearch">
                Search Books
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/notespage" eventKey="/notespage">
                My Notes
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/TBR_List" eventKey="/TBRList">
                My TBR List
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Offcanvas>
      </Navbar>
    </>
  );
};
export default Navigation;
