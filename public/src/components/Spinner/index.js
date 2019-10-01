import React from "react";

const Spinner = props => {
  const spinnerClasses = () => {
    let baseClass = "";

    if (props.center) baseClass += "text-center";

    return baseClass;
  };

  return (
    <div className={spinnerClasses()}>
      <img
        src={require("../../assets/icons/spinner.gif")}
        alt="spinner"
        width={props.size}
      />
    </div>
  );
};

Spinner.defaultProps = {
  size: "40px",
  center: false
};

export default Spinner;
