import React from "react";

const Spinner = props => (
  <div className={props.center && "text-center"}>
    <img
      src={require("../../assets/icons/spinner.gif")}
      alt="spinner"
      width={props.size}
    />
  </div>
);

Spinner.defaultProps = {
  size: "40px",
  center: false
};

export default Spinner;
