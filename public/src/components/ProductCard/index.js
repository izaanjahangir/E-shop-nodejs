import React from "react";
import { Card, Button } from "react-bootstrap";

import "./index.scss";

const ProductCard = () => (
  <Card className="product-card" style={{ width: "18rem" }}>
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
      <Button variant="primary">Explore</Button>
    </Card.Body>
  </Card>
);

export default ProductCard;
