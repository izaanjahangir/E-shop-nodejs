import React, { Component } from "react";

import { Carousel } from "react-bootstrap";
import "./style.scss";

class ProductCarousel extends Component {
  state = {
    index: 0,
    direction: null
  };

  decideIndicatorsClasses = i => {
    const { index } = this.state;

    let baseClass = "";

    if (index === i) {
      baseClass += "active";
    }

    return baseClass;
  };

  handleSelect = selectedIndex => {
    this.setState({ index: selectedIndex });
  };

  render() {
    const { index } = this.state;
    const { images } = this.props;

    return (
      <div className="product-carousel-outer-container">
        <Carousel
          className="product-carousel-container"
          activeIndex={index}
          onSelect={this.handleSelect}
          indicators={false}
        >
          {images.map((item, index) => (
            <Carousel.Item key={index} className="text-center">
              <img className="h-100" src={item} alt="" />
            </Carousel.Item>
          ))}
        </Carousel>
        <div className="indicators">
          {images.map((item, i) => (
            <img
              key={i}
              className={this.decideIndicatorsClasses(i)}
              onClick={() => this.handleSelect(i)}
              alt=""
              src={item}
            />
          ))}
        </div>
      </div>
    );
  }
}

ProductCarousel.defaultProps = {
  images: []
};

export default ProductCarousel;
