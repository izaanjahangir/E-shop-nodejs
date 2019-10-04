import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Tabs, Tab } from "react-bootstrap";

import Avatar from "../../components/Avatar";
import loaderActions from "../../redux/loading/action";
import messageBoxActions from "../../redux/messageBox/action";
import authActions from "../../redux/auth/action";
import api from "../../config/api";
import Basic from "./Basic";
import Security from "./Security";
import Header from "../../components/Header";
import Spinner from "../../components/Spinner";
import "./style.scss";

class Profile extends Component {
  constructor(props) {
    super(props);
    let user = null;
    let isSame = false;

    const location = props.history.location;
    const id = location.pathname.split("/")[
      location.pathname.split("/").length - 1
    ];

    if (props.user && id === props.user._id) {
      user = props.user;
      isSame = true;
    }

    this.state = {
      id,
      user,
      isSame
    };
  }

  componentDidMount() {
    const { user } = this.props;

    if (!user) {
      this.fetchUser();
    }
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(this.props.user) !== JSON.stringify(prevProps.user)) {
      this.setState({ user: this.props.user });
    }
  }

  fetchUser = async () => {
    const { id } = this.state;
    const { openMessageBox } = this.props;

    try {
      this.setState({ isLoading: true });

      const response = await api.fetchUserById({ id });

      this.setState({ user: response });
    } catch (e) {
      console.log("e =>", e);
      openMessageBox({
        type: "success",
        message: e.message
      });
    }

    this.setState({ isLoading: false });
  };

  onBasicSubmit = async newProfile => {
    const { startLoading, stopLoading, token, updateUser, openMessageBox } = this.props;
    try {
      startLoading();

      const response = await api.updateUser(newProfile, token);

      openMessageBox({
        type: "success",
        message: "Profile successfully updated!"
      });

      updateUser(response);
    } catch (e) {
      console.log("e =>", e);
      openMessageBox({
        type: "error",
        message: e.message
      });
    }

    stopLoading();
  };

  handleAvatarUpload = async file => {
    const {
      startLoading,
      stopLoading,
      token,
      updateUser,
      openMessageBox
    } = this.props;

    try {
      startLoading();

      const formdata = new FormData();
      formdata.append("image", file);

      const response = await api.updateUser(formdata, token);

      openMessageBox({
        type: "success",
        message: "Profile picture successfully changed!"
      });

      updateUser(response);
    } catch (e) {
      console.log("e =>", e);
      openMessageBox({
        type: "error",
        message: e.message
      });
    }

    stopLoading();
  };

  onSecuritySubmit = async newCredentials => {
    const { startLoading, stopLoading, token, openMessageBox } = this.props;

    try {
      startLoading();

      const payload = {
        oldPassword: newCredentials.oldPassword,
        newPassword: newCredentials.newPassword
      };

      await api.changePassword(payload, token);

      openMessageBox({
        type: "success",
        message: "Password successfully changed!"
      });
    } catch (e) {
      console.log("e =>", e);
      openMessageBox({
        type: "error",
        message: e.message
      });
    }

    stopLoading();
    this.securityForm.resetForm();
  };

  render() {
    const { user, isSame, isLoading } = this.state;

    return (
      <div id="container">
        <Header />
        <Container id="profile">
          {!isLoading && user && (
            <Row className="my-3">
              <Col md={3}>
                <Avatar
                  allowInput={isSame}
                  onSelect={this.handleAvatarUpload}
                  id="profile-picture"
                  url={user.profilePicture}
                />
              </Col>
              <Col md={9} className="profile-info">
                <Tabs defaultActiveKey="basic">
                  <Tab eventKey="basic" title="Basic">
                    <Basic
                      onSubmit={this.onBasicSubmit}
                      user={user}
                      isSame={isSame}
                    />
                  </Tab>
                  {isSame && (
                    <Tab eventKey="security" title="Security">
                      <Security
                        customRef={securityForm =>
                          (this.securityForm = securityForm)
                        }
                        onSubmit={this.onSecuritySubmit}
                      />
                    </Tab>
                  )}
                </Tabs>
              </Col>
            </Row>
          )}
          {isLoading && <Spinner size="120px" center={true} />}
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  token: state.auth.token
});

const mapDispatchToProps = {
  startLoading: loaderActions.startLoading,
  stopLoading: loaderActions.stopLoading,
  updateUser: authActions.updateUser,
  openMessageBox: messageBoxActions.openMessageBox
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
