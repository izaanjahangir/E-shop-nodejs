import React, { Component } from "react";

import "./style.scss";

class Avatar extends Component {
  profilePictureClasses = () => {
    const { allowInput } = this.props;

    let baseClass = "profile-picture";

    if (allowInput) baseClass += " pointer";

    return baseClass;
  };

  handleChange = e => {
    const { allowInput, onSelect } = this.props;

    if (allowInput) {
      const file = e.target.files[0];
      onSelect(file);
    }
  };

  render() {
    const { url, id, allowInput } = this.props;

    return (
      <div className="profile-wrapper">
        {allowInput && (
          <input
            onChange={this.handleChange}
            type="file"
            style={{ display: "none" }}
            id={id}
          />
        )}
        <label
          htmlFor={id}
          style={{ backgroundImage: `url('${url}')` }}
          className={this.profilePictureClasses()}
        >
          {allowInput && (
            <div className="overlay">
              <p>Change</p>
            </div>
          )}
        </label>
      </div>
    );
  }
}

Avatar.defaultProps = {
  url: "",
  id: "",
  allowInput: false,
  onSelect: function() {}
};

export default Avatar;
