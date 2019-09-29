import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import StarRatingComponent from "react-star-rating-component";

import "./index.scss";

const ProductCard = props => {
  const [rating, setRating] = useState(props.rating);

  const onStarClick = value => setRating(value);

  return (
    <Card className="product-card" style={{ width: "18rem", ...props.style }}>
      <Card.Img
        variant="top"
        src="http://www.drapersmaylands.com/MainFolder/home-banner/default-banner-mobile.jpg"
      />
      <Card.Body className="pt-1">
        <p className="category">Category</p>
        <Card.Title className="title">Card Title</Card.Title>
        <div className="price-container">
          <p className="discount active">$300</p>
          <p className="real">$300</p>
        </div>
        <div style={{ fontSize: "24px" }}>
          <StarRatingComponent
            name="rate1"
            starCount={5}
            value={rating}
            onStarClick={onStarClick}
            editing={props.ratingEditing}
          />
        </div>
        <Button
          size="sm"
          variant="primary"
          className="mr-1"
          onClick={props.onExplore}
        >
          Explore
        </Button>
        <Button size="sm" variant="danger" className="ml-1">
          Add To Cart
        </Button>
      </Card.Body>
    </Card>
  );
};

ProductCard.defaultProps = {
  style: {},
  ratingEditing: false,
  rating: 0,
  onExplore: function() {}
};

export default ProductCard;
