import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";

import productActions from "../../redux/product/action";
import ProductSlider from "../../components/ProductSlider";
import Header from "../../components/Header";
import "./index.scss";

class Home extends Component {
  componentDidMount() {
    this.props.fetchLatestProducts();
  }

  render() {
    const { latestProducts } = this.props;

    return (
      <div id="container">
        <Header />
        <Container>
          <ProductSlider
            sliderTitle="Latest Products"
            data={latestProducts.data}
            loading={latestProducts.loading}
          />
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  latestProducts: state.product.latestProducts
});

const mapDispatchToProps = {
  fetchLatestProducts: productActions.fetchLatestProducts
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
