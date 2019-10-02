import React, { Component } from "react";
import {
  Form,
  FormGroup,
  FormControl,
  FormLabel,
  FormText
} from "react-bootstrap";

import Button from "../../components/Button";

class Basic extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...props.user
    };
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(this.props.user) !== JSON.stringify(prevProps.user)) {
      this.setState({ ...this.props.user });
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { firstName, lastName } = this.state;
    const formData = new FormData();

    if (firstName) formData.append("firstName", firstName);
    if (lastName) formData.append("lastName", lastName);

    this.props.onSubmit(formData);
  };

  render() {
    const { username, firstName, lastName, email } = this.state;
    const { isSame } = this.props;

    return (
      <Form onSubmit={this.handleSubmit} className="my-3">
        <FormGroup>
          <FormLabel htmlFor="username">Username</FormLabel>
          <FormControl
            name="username"
            id="username"
            onChange={this.handleChange}
            type="text"
            placeholder="username"
            value={username}
            disabled
          />
          {isSame && <FormText>Username can't be changed</FormText>}
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="firstName">First Name</FormLabel>
          <FormControl
            name="firstName"
            id="firstName"
            onChange={this.handleChange}
            type="text"
            placeholder="Enter your first name"
            value={firstName}
            disabled={!isSame}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="firstName">Last Name</FormLabel>
          <FormControl
            name="lastName"
            id="lastName"
            onChange={this.handleChange}
            type="text"
            placeholder="Enter your last name"
            value={lastName}
            disabled={!isSame}
          />
        </FormGroup>
        {isSame && (
          <FormGroup>
            <FormLabel htmlFor="email">Email</FormLabel>
            <FormControl
              name="email"
              id="email"
              onChange={this.handleChange}
              type="text"
              placeholder="Enter your email"
              value={email}
              disabled
            />
            <FormText>Email can't be changed</FormText>
          </FormGroup>
        )}
        {isSame && (
          <FormGroup>
            <Button disabled={!isSame} type="submit" value="Change" />
          </FormGroup>
        )}
      </Form>
    );
  }
}

Basic.defaultProps = {
  user: {},
  onSubmit: function() {}
};

export default Basic;
