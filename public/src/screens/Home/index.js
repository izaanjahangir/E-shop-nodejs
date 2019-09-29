import React, { Component } from "react";
import { Container } from "react-bootstrap";

import ProductSlider from "../../components/ProductSlider";
import Header from "../../components/Header";
import "./index.scss";

class Home extends Component {
  render() {
    return (
      <div id="container">
        <Header />
        <Container>
          <ProductSlider />
        </Container>
      </div>
    );
  }
}

export default Home;
