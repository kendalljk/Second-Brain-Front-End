import React from 'react'
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import logo from '../icons/logo.png';

export const Navigation = () => {
  return (
    <>
        <Navbar bg='dark' variant='dark' expand='lg'>
            <Navbar.Brand as='h1'>
                <img
                src={logo} 
                alt=''
                width="40"
                height="40"
                />
                Second Brain
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='my-nav'/>
            <Navbar.Collapse id='my-nav'>
                <Nav className='ml-auto'>
                    <Nav.Link as={Link} to='/'>Home</Nav.Link>
                    <NavDropdown title="More">
                        <NavDropdown.Item 
                        as={Link} 
                        to='/booksearch'>
                            Add Notes to Book
                        </NavDropdown.Item>
                        <NavDropdown.Item 
                        as={Link} 
                        to='/notescollection'>
                            Notes Collection 
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </>
  )
}
export default Navigation;