import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import "./styles.css";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Context } from "../../contexts/auth";
import history from "./../../history";
const PageHeader = (props) => {
  const { authenticated, handleLogout, user } = useContext(Context);

  return (
    <header className="page-header">
      <div className="top-bar-container">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">
            <strong>{props.title}</strong>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav
              className="justify-content-end"
              onSelect={(selectedKey) => console.log(selectedKey)}
            >
              <NavLink
                activeClassName="navbar__link--active"
                className="navbar__link"
                to="/products"
              >
                Products
              </NavLink>
              <NavLink
                activeClassName="navbar__link--active"
                className="navbar__link"
                to="/admin-panel"
              >
                Painel
              </NavLink>

              <NavLink
                to="/logout"
                activeClassName="navbar__link--active"
                className="navbar__link"
              >
                Sair
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>

      <div className="header-content">{props.children}</div>
    </header>
  );
};

export default PageHeader;
