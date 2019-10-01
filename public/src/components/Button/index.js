import React from "react";
import { Button as BootstrapButton } from "react-bootstrap";
import Ink from "react-ink";

const Button = props => (
  <BootstrapButton className="position-relative" {...props}>
    <span>{props.value}</span>
    <Ink />
  </BootstrapButton>
);

export default Button;
