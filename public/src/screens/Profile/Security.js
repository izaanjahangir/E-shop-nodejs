import React, { Component } from "react";
import { Form, FormGroup, FormControl, FormLabel } from "react-bootstrap";

import Button from "../../components/Button";

class Security extends Component {
  state = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  };

  componentDidMount = () => {
    this.props.customRef({ resetForm: this.resetForm });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { oldPassword, newPassword, confirmPassword } = this.state;

    this.props.onSubmit({ oldPassword, newPassword, confirmPassword });
  };

  resetForm = () => {
    this.setState({ oldPassword: "", newPassword: "", confirmPassword: "" });
  };

  render() {
    const { oldPassword, newPassword, confirmPassword } = this.state;

    return (
      <Form onSubmit={this.handleSubmit} className="my-3">
        <FormGroup>
          <FormLabel htmlFor="oldPassword">Old password</FormLabel>
          <FormControl
            type="password"
            name="oldPassword"
            onChange={this.handleChange}
            id="oldPassword"
            value={oldPassword}
            placeholder="Enter your old password"
          />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="newPassword">New password</FormLabel>
          <FormControl
            type="password"
            name="newPassword"
            onChange={this.handleChange}
            id="newPassword"
            value={newPassword}
            placeholder="Enter your new password"
          />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="confirmPassword">Confirm password</FormLabel>
          <FormControl
            type="password"
            name="confirmPassword"
            onChange={this.handleChange}
            id="confirmPassword"
            value={confirmPassword}
            placeholder="Re-enter your new password"
          />
        </FormGroup>
        <FormGroup>
          <Button type="submit" value="Change password" />
        </FormGroup>
      </Form>
    );
  }
}

Security.defaultProps = {
  onSubmit: function() {},
  ref: function() {}
};

export default Security;
