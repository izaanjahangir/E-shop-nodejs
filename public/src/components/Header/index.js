import React from "react";
import { Link, withRouter } from "react-router-dom";

import { Navbar } from "react-bootstrap";
import "./index.scss";

const Header = () => (
  <Navbar className="custom-header" variant="dark">
    <Navbar.Brand>
      <Link className="branding-name" to="/">
        Eshop
      </Link>
    </Navbar.Brand>
  </Navbar>
);

export default withRouter(Header);
