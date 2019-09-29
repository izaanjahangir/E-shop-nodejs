import React from "react";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from "react-router-dom";

import constants from "../../config/constants";
import "./index.scss";
import ProductCard from "../ProductCard";

const ProductSlider = props => {
  let sliderRef;

  const navigate = () => props.history.push("/product/test");

  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  return (
    <div id="product-slider-container" className="my-4">
      <h1>Product Slider</h1>
      <Slider ref={slider => (sliderRef = slider)} {...settings}>
        <ProductCard
          onExplore={navigate}
          style={{ margin: "auto", marginRight: "10px" }}
        />
        <ProductCard onExplore={navigate} style={{ margin: "auto" }} />
        <ProductCard onExplore={navigate} style={{ margin: "auto" }} />
        <ProductCard onExplore={navigate} style={{ margin: "auto" }} />
        <ProductCard onExplore={navigate} style={{ margin: "auto" }} />
        <ProductCard onExplore={navigate} style={{ margin: "auto" }} />
      </Slider>
      <div className="arrow-container">
        <FontAwesomeIcon
          onClick={() => sliderRef.slickPrev()}
          icon={constants.icons.faArrowAltCircleLeft}
        />
        <FontAwesomeIcon
          onClick={() => sliderRef.slickNext()}
          icon={constants.icons.faArrowAltCircleRight}
        />
      </div>
    </div>
  );
};

export default withRouter(ProductSlider);
