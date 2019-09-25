import React, { Component } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

import CustomInputLarge from "../../components/CustomInputLarge";
import CustomButtonLarge from "../../components/CustomButtonLarge";
import AuthBackground from "../../components/AuthBackground";

export default class Register extends Component {
  state = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "male"
  };

  handleTextChange = e => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({ [name]: value });
  };

  avatarClass = type => {
    const { gender } = this.state;
    let baseClass = "avatar-option";

    if (type === gender) baseClass += " active";
    if (type === "female") baseClass += " ml-2";

    return baseClass;
  };

  render() {
    const {
      firstName,
      lastName,
      username,
      email,
      password,
      confirmPassword,
      gender
    } = this.state;

    return (
      <div className="full-height">
        <AuthBackground />
        <Container className="h-100 d-flex justify-content-center">
          <div style={{ maxWidth: "700px" }}>
            <Form className="my-4">
              <Row>
                <Col xs={12}>
                  <div className="text-center">
                    <img
                      src={require("../../assets/images/default-profile.png")}
                      alt=""
                      className="auth-profile-picture"
                    />
                  </div>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col md={6}>
                  <CustomInputLarge
                    type="text"
                    value={firstName}
                    addonIcon="faUser"
                    addonClasses="auth-addon-icon"
                    name="firstName"
                    placeholder="First Name"
                    onChange={this.handleTextChange}
                  />
                </Col>
                <Col md={6}>
                  <CustomInputLarge
                    type="text"
                    value={lastName}
                    addonIcon="faUser"
                    addonClasses="auth-addon-icon"
                    name="lastName"
                    placeholder="Last Name"
                    onChange={this.handleTextChange}
                  />
                </Col>
                <Col md={6}>
                  <CustomInputLarge
                    type="text"
                    value={username}
                    addonIcon="faUser"
                    addonClasses="auth-addon-icon"
                    name="username"
                    placeholder="Username"
                    onChange={this.handleTextChange}
                  />
                </Col>
                <Col md={6}>
                  <CustomInputLarge
                    type="email"
                    value={email}
                    addonIcon="faEnvelope"
                    addonClasses="auth-addon-icon"
                    name="email"
                    placeholder="Email"
                    onChange={this.handleTextChange}
                  />
                </Col>
                <Col md={6}>
                  <CustomInputLarge
                    type="password"
                    value={password}
                    addonIcon="faLock"
                    addonClasses="auth-addon-icon"
                    name="password"
                    placeholder="Password"
                    onChange={this.handleTextChange}
                  />
                </Col>
                <Col md={6}>
                  <CustomInputLarge
                    type="password"
                    value={confirmPassword}
                    addonIcon="faLock"
                    addonClasses="auth-addon-icon"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    onChange={this.handleTextChange}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <p className="gender-text ml-3 mb-1">You are a {gender}</p>
                  <img
                    src={require("../../assets/images/male.png")}
                    className={this.avatarClass("male")}
                    onClick={() => this.setState({ gender: "male" })}
                    alt=""
                  />
                  <img
                    src={require("../../assets/images/female.png")}
                    className={this.avatarClass("female")}
                    onClick={() => this.setState({ gender: "female" })}
                    alt=""
                  />
                </Col>
                <Col className="mt-4 mx-auto" md={6}>
                  <div>
                    <CustomButtonLarge text="Register" />
                  </div>
                  <div className="my-3 text-center">
                    <Link className="link" to="/login">
                      Already a user? Login
                    </Link>
                  </div>
                </Col>
              </Row>
            </Form>
          </div>
        </Container>
      </div>
    );
  }
}
