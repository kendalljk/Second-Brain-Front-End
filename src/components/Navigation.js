import React from 'react'
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'
import {Link} from 'react-router-dom'

export const Navigation = () => {
  return (
    <>
        <Navbar bg='light' expand='lg'>
            <Navbar.Brand>
                <img
                alt=""
                src='./icons/Vector.png'
                width="30"
                height="30"
                className="d-inline-block align-top"
                />
                Book Notes
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='my-nav'/>
            <Navbar.Collapse id='my-nav'>
                <Nav className='ml-auto'>
                    <Nav.Link as={Link} to='/'>Home</Nav.Link>
                    <NavDropdown title="More">
                        <NavDropdown.Item 
                        as={Link} 
                        to='/createnote'>
                            Create Note
                        </NavDropdown.Item>
                        <NavDropdown.Item 
                        as={Link} 
                        to='/booknotes'>
                            Book Notes 
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </>
  )
}
export default Navigation;