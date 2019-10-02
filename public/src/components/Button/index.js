import React from "react";
import { Button as BootstrapButton } from "react-bootstrap";
import Ink from "react-ink";

const Button = props => (
  <BootstrapButton
    {...props}
    className={"position-relative " + props.className}
  >
    <span>{props.value}</span>
    {!props.disabled && <Ink />}
  </BootstrapButton>
);

export default Button;
