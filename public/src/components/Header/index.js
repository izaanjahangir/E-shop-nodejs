import React from "react";
import { withRouter, Link } from "react-router-dom";
import {
  Form,
  FormControl,
  InputGroup,
  DropdownButton,
  Dropdown,
  Button
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import constants from "../../config/constants";
import "./index.scss";

const Header = () => (
  <div id="custom-header-container">
    <Link className="header-brand" to="/">
      <h3>Eshop</h3>
    </Link>
    <Form>
      <InputGroup size="sm">
        <DropdownButton
          as={InputGroup.Prepend}
          variant="outline-primary"
          title="Dropdown"
          id="input-group-dropdown-1"
          size="sm"
        >
          <Dropdown.Item href="#">Action</Dropdown.Item>
          <Dropdown.Item href="#">Another action</Dropdown.Item>
          <Dropdown.Item href="#">Something else here</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href="#">Separated link</Dropdown.Item>
        </DropdownButton>
        <FormControl />
        <InputGroup.Append>
          <Button variant="danger">Search</Button>
        </InputGroup.Append>
      </InputGroup>
    </Form>
    <div id="header-icons">
      <HeaderIcon count="5" text="Your wishlist" icon="faHeart" />
      <HeaderIcon text="Your cart" icon="faShoppingCart" />
    </div>
  </div>
);

const HeaderIcon = props => (
  <div className="d-flex flex-column align-items-center">
    <div className="position-relative">
      {props.count && <div className="count">{props.count}</div>}
      <FontAwesomeIcon
        className="heart-icon"
        icon={constants.icons[props.icon]}
      />
    </div>
    <p>{props.text}</p>
  </div>
);

export default withRouter(Header);
