import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";

import CustomButtonLarge from "../../components/CustomButtonLarge";
import ProductCard from "../../components/ProductCard";
import Header from "../../components/Header";
import "./index.scss";

class Home extends Component {
  render() {
    return (
      <div>
        <div id="container">
          <Header />
          <Container>
            <div id="latest-products">
              <ProductCard />
            </div>
          </Container>
        </div>
      </div>
    );
  }
}

export default Home;
