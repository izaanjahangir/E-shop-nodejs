import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Tabs, Tab } from "react-bootstrap";

import Basic from "./Basic";
import Security from "./Security";
import Header from "../../components/Header";
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

  fetchUser = () => {
    console.log("fetching user...");
  };

  onBasicSubmit = newProfile => {
    console.log("newProfile =>", newProfile);
  };

  onSecuritySubmit = newCredentials => {
    console.log("newCredentials =>", newCredentials);
  };

  render() {
    const { user, isSame } = this.state;

    return (
      <div id="container">
        <Header />
        <Container>
          <Row className="my-3">
            <Col md={3}>
              <div className="profile-wrapper">
                <div
                  style={{ backgroundImage: `url('${user.profilePicture}')` }}
                  className="profile-picture"
                ></div>
              </div>
            </Col>
            <Col md={9}>
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
                    <Security onSubmit={this.onSecuritySubmit} />
                  </Tab>
                )}
              </Tabs>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({ user: state.auth.user });

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
