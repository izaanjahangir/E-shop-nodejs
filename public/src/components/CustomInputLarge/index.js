import React, { Component } from "react";
import { InputGroup, FormControl } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import constants from "../../config/constants";
import "./index.scss";

class CustomInputLarge extends Component {
  state = {
    active: false
  };

  addonClasses = () => {
    let baseClass = this.props.addonClasses;

    if (this.state.active) baseClass += " active";

    return baseClass;
  };

  handleState = active => {
    this.setState({ active });
  };

  render() {
    const props = this.props;

    return (
      <InputGroup
        onFocus={() => this.handleState(true)}
        onBlur={() => this.handleState(false)}
        className="mb-3 custom-input-large-container"
      >
        {props.addonIcon && (
          <div className="custom-input-addon">
            <FontAwesomeIcon
              icon={constants.icons[props.addonIcon]}
              size="sm"
              className={this.addonClasses()}
            />
          </div>
        )}
        <FormControl
          size="lg"
          type={props.type}
          onChange={props.onChange}
          value={props.value}
          name={props.name}
          placeholder={props.placeholder}
        />
      </InputGroup>
    );
  }
}

CustomInputLarge.defaultProps = {
  name: "",
  placeholder: "",
  value: "",
  onChange: function() {},
  type: "text",
  addonClasses: ""
};

export default CustomInputLarge;
