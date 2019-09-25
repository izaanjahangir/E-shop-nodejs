import React, { Component } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

import CustomInputLarge from "../../components/CustomInputLarge";
import CustomButtonLarge from "../../components/CustomButtonLarge";
import AuthBackground from "../../components/AuthBackground";

export default class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  handleTextChange = e => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({ [name]: value });
  };

  render() {
    const { username, password } = this.state;

    return (
      <div className="full-height">
        <AuthBackground />
        <Container className="h-100">
          <Row className="justify-content-center align-items-center h-100">
            <Col md={6} lg={5}>
              <Form>
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
                <CustomButtonLarge text="Login" />
                <div className="my-3 text-center">
                  <Link className="link" to="/register">
                    Forgot Username/Password?
                  </Link>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
