import React from "react";
import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import LoginModal from "./LoginModal";
import { useAuth } from "../context/AuthContext";

function TopNav() {
  const { isAuthenticated, showLoginModal, setShowLoginModal, logout } = useAuth();

  return (
    <>
      <Navbar expand="lg" className="navbar ">
        <Container>
          <NavLink to="/" className="nav-link"><h4>Generador de Facturas</h4></NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              
              {isAuthenticated && (
                <>
                  <NavLink to="/invoices" className="nav-link">Invoices</NavLink>
                  <NavLink to="/invoice-form" className="nav-link">Add Invoice</NavLink>
                </>
              )}
            </Nav>
            <Nav className="ms-auto">
              {isAuthenticated ? (
                <Button variant="danger" onClick={logout}>Logout</Button>
              ) : (
                <Button variant="success" onClick={() => setShowLoginModal(true)}>Login</Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Modal de Login */}
      <LoginModal show={showLoginModal} handleClose={() => setShowLoginModal(false)} />
    </>
  );
}

export default TopNav;
