import React from 'react'
import { NavLink} from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/navbar.css'

const  NavBar = () => {
  return (
    <div>
      <Navbar expand="lg" className="navbar">
      <Container>
      <Navbar.Brand ><NavLink to="/"  className="brand">Navbar</NavLink></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto  mx-auto my-lg-0 me-auto p-3">
            <NavLink to="/" className="link">Home</NavLink>
            <NavLink to="/Cv" className="link">CV</NavLink>
            <NavLink to="/support" className="link">support</NavLink>
            <NavLink to="/emp" className="link">emp</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default NavBar