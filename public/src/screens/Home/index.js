import React, { Component } from "react";
import { Container } from "react-bootstrap";

import ProductSlider from "../../components/ProductSlider";
import Header from "../../components/Header";
import "./index.scss";

class Home extends Component {
  render() {
    return (
      <div>
        <div id="container">
          <Header />
          <Container>
            {/* <div id="latest-products">
              <ProductCard />
            </div> */}
            <ProductSlider />
          </Container>
        </div>
      </div>
    );
  }
}

export default Home;
