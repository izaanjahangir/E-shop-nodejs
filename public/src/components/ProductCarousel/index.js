import React, { Component } from "react";

import { Carousel } from "react-bootstrap";
import "./style.scss";

class ProductCarousel extends Component {
  state = {
    index: 0,
    direction: null
  };

  handleSelect = selectedIndex => {
    console.log("selectedIndex =>", selectedIndex);

    this.setState({ index: selectedIndex });
  };

  render() {
    const { index } = this.state;

    return (
      <div className="product-carousel-outer-container">
        <Carousel
          className="product-carousel-container"
          activeIndex={index}
          onSelect={this.handleSelect}
          indicators={false}
        >
          <Carousel.Item className="text-center">
            <img
              className="h-100"
              src="http://res.cloudinary.com/deot6gwx4/image/upload/v1569752225/products/5d90849e9e987b3768dd6526/Infinix_HOT_4_Pro_X556_L_1-1569752222341.jpg"
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item className="text-center">
            <img
              className="h-100"
              src="http://res.cloudinary.com/deot6gwx4/image/upload/v1569752225/products/5d90849e9e987b3768dd6526/Infinix_HOT_4_Pro_X556_L_1-1569752222341.jpg"
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item className="text-center">
            <img
              className="h-100"
              src="http://res.cloudinary.com/deot6gwx4/image/upload/v1569752225/products/5d90849e9e987b3768dd6526/Infinix_HOT_4_Pro_X556_L_1-1569752222341.jpg"
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
        <div className="indicators">
          <img
            alt=""
            src="http://res.cloudinary.com/deot6gwx4/image/upload/v1569752225/products/5d90849e9e987b3768dd6526/Infinix_HOT_4_Pro_X556_L_1-1569752222341.jpg"
          />
          <img
            alt=""
            src="http://res.cloudinary.com/deot6gwx4/image/upload/v1569752225/products/5d90849e9e987b3768dd6526/Infinix_HOT_4_Pro_X556_L_1-1569752222341.jpg"
          />
          <img
            alt=""
            src="http://res.cloudinary.com/deot6gwx4/image/upload/v1569752225/products/5d90849e9e987b3768dd6526/Infinix_HOT_4_Pro_X556_L_1-1569752222341.jpg"
          />
        </div>
      </div>
    );
  }
}

export default ProductCarousel;
