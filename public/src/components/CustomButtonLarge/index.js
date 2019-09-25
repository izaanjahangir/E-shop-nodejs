import React from "react";
import { Button } from "react-bootstrap";
import Ink from "react-ink";

import "./index.scss";

const CustomButtonLarge = props => (
  <Button className="custom-button-large" block size="lg">
    {props.text}
    <Ink />
  </Button>
);

CustomButtonLarge.defaultProps = {
  text: ""
};

export default CustomButtonLarge;
