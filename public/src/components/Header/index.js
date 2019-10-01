import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import {
  Form,
  FormControl,
  InputGroup,
  Button
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";

import constants from "../../config/constants";
import "./index.scss";

class Header extends Component {
  state = {
    title: "",
    category: ""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { category, title } = this.state;

    this.props.history.push("/product", { category, title });
  };

  render() {
    const { category, title } = this.state;

    return (
      <div id="custom-header-container">
        <Link className="header-brand" to="/">
          <h3>Eshop</h3>
        </Link>
        <Form onSubmit={this.handleSubmit}>
          <InputGroup size="sm">
            <FormControl
              name="category"
              value={category}
              onChange={this.handleChange}
              as="select"
            >
              <option value="" disabled>
                Category
              </option>
              {this.props.allCategories.map(item => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </FormControl>
            <FormControl
              name="title"
              placeholder="title"
              value={title}
              onChange={this.handleChange}
            />
            <InputGroup.Append>
              <Button type="submit" variant="danger">
                Search
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Form>
        <div id="header-icons">
          <HeaderIcon count="5" text="Your wishlist" icon="faHeart" />
          <HeaderIcon text="Your cart" icon="faShoppingCart" />
        </div>
      </div>
    );
  }
}

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

const mapStateToProps = state => ({
  allCategories: state.category.allCategories
});

const mapDispatchToProps = {};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
);
