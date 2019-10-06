import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import Ink from "react-ink";

import "./index.scss";

class AdminNavbar extends Component {
  render() {
    return (
      <Navbar
        id="admin-navbar"
        collapseOnSelect
        expand="sm"
        bg="dark"
        variant="dark"
      >
        <Link className="header-brand" to="/admin">
          Eshop
        </Link>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <NavLink path="/admin" text="Home" />
            <NavLink path="/admin/addcategory" text="Add category" />
            <NavLink path="/admin/addproduct" text="Add product" />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const NavLink = props => (
  <Link className="position-relative" to={props.path}>
    <span>{props.text}</span>
    <Ink />
  </Link>
);

export default AdminNavbar;
