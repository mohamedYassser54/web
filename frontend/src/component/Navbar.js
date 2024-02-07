import React, { useState} from 'react'
import { NavLink,useNavigate} from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/navbar.css'

const  NavBar = () => {
 
    const { t, i18n } = useTranslation();
    const [login, setLogin] = useState(false);
    const navigate = useNavigate();
  
    
    const changeEn = () =>{
        i18n.changeLanguage('en')
    }
    const changeFr = () =>{
        i18n.changeLanguage('ar')
    }
    const handleLogout =()=>{
      Cookies.remove("login");
      setLogin(false);
      navigate('/signin');
    }
  return (

    <div>
      <Navbar expand="lg" className="navbar">
      <Container>
      <Navbar.Brand ><NavLink to="/"  className="brand">{t("brand")}</NavLink></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto  mx-auto my-lg-0 me-auto p-3">
            <NavLink to="/" className="link">{t("Home")}</NavLink>
            <NavLink to="/Cv" className="link">{t("CV")}</NavLink>
            <NavLink to="/support" className="link">{t("support")}</NavLink>
            <NavLink to="/emp" className="link">{t("employees")}</NavLink>
            <NavLink  className="link" onClick={handleLogout}>{t("Logout")}</NavLink>
          </Nav>
          <button onClick={changeEn}>EN</button>
            <button onClick={changeFr}>AR</button>
        </Navbar.Collapse>
       
      </Container>
    </Navbar>
    </div>
  )
}

export default NavBar