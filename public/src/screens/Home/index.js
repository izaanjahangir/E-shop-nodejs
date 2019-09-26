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
        </div>
      </div>
    );
  }
}

export default Home;
