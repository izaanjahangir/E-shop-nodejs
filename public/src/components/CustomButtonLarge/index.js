import React from "react";
import { Button } from "react-bootstrap";
import Ink from "react-ink";

import "./index.scss";

const CustomButtonLarge = props => (
  <Button
    type={props.type}
    onClick={props.onClick}
    className="custom-button-large"
    block={props.block}
    size="lg"
  >
    {props.text}
    <Ink />
  </Button>
);

CustomButtonLarge.defaultProps = {
  text: "",
  type: "button",
  block: true,
  onClick: function(){}
};

export default CustomButtonLarge;
