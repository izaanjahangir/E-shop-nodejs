import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import constants from "../../config/constants";
import "./style.scss";

const Loader = props => (
  <div id="message-box">
    {typeof props.message !== "string" ? (
      props.message.map(item => <Box type={props.type} message={item} />)
    ) : (
      <Box {...props} />
    )}
  </div>
);

const Box = props => (
  <div className={"box mb-1 mt-2 " + props.type}>
    {props.type === "success" && (
      <FontAwesomeIcon icon={constants.icons["faCheckCircle"]} />
    )}
    {props.type === "error" && (
      <FontAwesomeIcon icon={constants.icons["faExclamationCircle"]} />
    )}
    <p className="ml-2">{props.message}</p>
  </div>
);

export default Loader;
