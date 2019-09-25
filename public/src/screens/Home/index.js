import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";

import CustomButtonLarge from "../../components/CustomButtonLarge";
import Header from "../../components/Header";
import "./index.scss";

class Home extends Component {
  render() {
    return (
      <div>
        <div id="container">
          <Header />
          <div id="hero-background">
            <div className="overlay"></div>
            <Container className="main">
              <Row className="w-100">
                <Col md={6} lg={4}>
                  <h1 className="mb-3">Shop with us</h1>
                  <CustomButtonLarge text="Shop now" />
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
