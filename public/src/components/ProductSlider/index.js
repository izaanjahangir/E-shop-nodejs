import React from "react";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from "react-router-dom";

import constants from "../../config/constants";
import "./index.scss";
import ProductCard from "../ProductCard";
import Spinner from "../Spinner";

const ProductSlider = props => {
  let sliderRef;

  const navigate = id => {
    const product = props.data.find(item => item._id === id);
    console.log("product =>", product);

    props.history.push(`/product/${id}`, { product });
  };

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
      <div className="d-flex align-items-center">
        <h1>{props.sliderTitle}</h1>
        {props.loading && <Spinner />}
      </div>
      {!!props.data.length && (
        <div id="product-slider">
          <Slider ref={slider => (sliderRef = slider)} {...settings}>
            {props.data.map(item => (
              <ProductCard
                key={item._id}
                data={item}
                onExplore={navigate}
                style={{ margin: "auto" }}
              />
            ))}
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
      )}
    </div>
  );
};

ProductSlider.defaultProps = {
  loading: false,
  sliderTitle: "Title",
  data: []
};

export default withRouter(ProductSlider);
