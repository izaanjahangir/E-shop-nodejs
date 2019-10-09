import React, { Component } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import authActions from "../../redux/auth/action";
import CustomInputLarge from "../../components/CustomInputLarge";
import CustomButtonLarge from "../../components/CustomButtonLarge";
import AuthBackground from "../../components/AuthBackground";

class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  componentDidMount() {
    if (this.props.user) {
      this.props.history.replace("/");
    }
  }

  handleTextChange = e => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { username, password } = this.state;
    const { login } = this.props;

    const credentials = { email: username, password };

    login(credentials);
  };

  componentDidUpdate() {
    if (this.props.user) {
      if (this.props.user.role === "admin") {
        return this.props.history.replace("/admin");
      }

      this.props.history.replace("/");
    }
  }

  render() {
    const { username, password } = this.state;

    return (
      <div className="full-height">
        <AuthBackground />
        <Container className="h-100 d-flex justify-content-center">
          <Row className="w-100 justify-content-center align-items-center">
            <Col md={8} lg={5}>
              <Form onSubmit={this.handleSubmit}>
                <div className="text-center my-4">
                  <img
                    src={require("../../assets/images/default-profile.png")}
                    alt=""
                    className="auth-profile-picture"
                  />
                </div>
                <CustomInputLarge
                  type="text"
                  value={username}
                  addonIcon="faUser"
                  addonClasses="auth-addon-icon"
                  name="username"
                  placeholder="Username"
                  onChange={this.handleTextChange}
                />
                <CustomInputLarge
                  type="password"
                  value={password}
                  addonIcon="faLock"
                  addonClasses="auth-addon-icon"
                  name="password"
                  placeholder="Password"
                  onChange={this.handleTextChange}
                />
                <CustomButtonLarge type="submit" text="Login" />
                <div className="my-3 text-center">
                  <Link className="link" to="/register">
                    Don't have an account? Register
                  </Link>
                </div>
              </Form>
              <CustomButtonLarge
                onClick={() => this.props.history.push("/")}
                text="Continue as guest"
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({ user: state.auth.user });

const mapDispatchToProps = {
  login: authActions.login
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
