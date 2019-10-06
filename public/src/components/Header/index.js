import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import {
  Form,
  FormControl,
  InputGroup,
  Button,
  Dropdown
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import Ink from "react-ink";

import authActions from "../../redux/auth/action";
import constants from "../../config/constants";
import "./index.scss";

class Header extends Component {
  state = {
    title: "",
    category: ""
  };

  componentDidUpdate(prevProps) {
    if (prevProps.user && !this.props.user) {
      this.props.history.replace("/login");
    }
  }

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
    const { user, logout } = this.props;

    return (
      <div id="custom-header">
        <div
          id="auth-container"
          className="d-flex justify-content-end align-items-center"
        >
          {user ? (
            <Dropdown>
              <Dropdown.Toggle
                variant="success"
                as={UserProfile}
                user={user}
                id="dropdown-basic"
              ></Dropdown.Toggle>

              <Dropdown.Menu>
                <div className="text-center dropdown-user">
                  <img
                    src={user.profilePicture}
                    width="60px"
                    alt="profile"
                    style={{ borderRadius: "100%" }}
                  />
                  <p>
                    <Link to={`/user/${user._id}`}>View Profile</Link>
                  </p>
                </div>
                <Dropdown.Divider />
                <Dropdown.Item
                  onClick={logout}
                  as="button"
                  className="btn btn-danger"
                >
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <p>
              <Link to="/login">Login</Link>
            </p>
          )}
        </div>
        {this.props.searchHeader && (
          <div id="custom-header-container">
            <Link className="header-brand" to="/">
              <h3>Eshop</h3>
            </Link>
            {this.props.search && (
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
            )}
            <div id="header-icons">
              {/* <HeaderIcon count="5" text="Your wishlist" icon="faHeart" /> */}
              {user && (
                <HeaderIcon
                  onClick={() => this.props.history.push("/user/cart")}
                  text="Your cart"
                  count={this.props.cart.length}
                  icon="faShoppingCart"
                />
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

const HeaderIcon = props => (
  <div
    onClick={props.onClick}
    className="d-flex flex-column align-items-center pointer position-relative"
  >
    <div className="position-relative">
      {!!props.count && <div className="count">{props.count}</div>}
      <FontAwesomeIcon
        className="heart-icon"
        icon={constants.icons[props.icon]}
      />
    </div>
    <p>{props.text}</p>
    <Ink />
  </div>
);

const CaretDown = () => (
  <FontAwesomeIcon
    icon={constants.icons["faCaretDown"]}
    className="arrow-down"
  />
);

class UserProfile extends Component {
  handleClick = e => {
    e.preventDefault();

    this.props.onClick(e);
  };

  render() {
    return (
      <div
        id={this.props.id}
        onClick={this.handleClick}
        className="login-user text-right d-flex align-items-center"
      >
        <span>{this.props.user.username}</span>
        <CaretDown />
        <Ink />
      </div>
    );
  }
}

Header.defaultProps = {
  search: true,
  searchHeader: true
};

const mapStateToProps = state => ({
  allCategories: state.category.allCategories,
  user: state.auth.user,
  cart: state.cart.cart
});

const mapDispatchToProps = {
  logout: authActions.logout
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
);
