import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../icons/logo.png";

export const Navigation = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="brain logo" width="30" height="30" />
          Second Brain
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav justify="true" defaultActiveKey="/" variant="tabs">
            <Nav.Item>
              <Nav.Link as={Link} to="/" eventKey="/">
                Home
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/booksearch" eventKey="/booksearch">
                Add Notes
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/notespage" eventKey="/notespage">
                My Notes
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};
export default Navigation;
