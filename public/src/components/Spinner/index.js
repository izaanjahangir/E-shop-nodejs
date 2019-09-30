import React from "react";

const Spinner = props => (
  <div>
    <img src={require("../../assets/icons/spinner.gif")} alt="spinner" width={props.size} />
  </div>
);

Spinner.defaultProps = {
  size: "40px"
};

export default Spinner;
