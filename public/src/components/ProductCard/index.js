import React from "react";
import { Card } from "react-bootstrap";
// import StarRatingComponent from "react-star-rating-component";
import { connect } from "react-redux";

import Button from "../Button";
import cartActions from "../../redux/cart/action";
import "./index.scss";

const ProductCard = props => {
  // const [rating, setRating] = useState(props.rating);
  const data = props.data;

  // const onStarClick = value => setRating(value);

  return (
    <Card className="product-card" style={{ width: "18rem", ...props.style }}>
      <div
        className="product-card-banner"
        style={{ backgroundImage: `url('${data.bannerImage}')` }}
      ></div>
      <Card.Body className="pt-1">
        <p className="category">{data.category.name}</p>
        <Card.Title className="title">{data.title}</Card.Title>
        <div className="price-container">
          {!!data.discountedPrice && (
            <p className="discount active">{data.price}$</p>
          )}
          <p className={"real" + !data.discountedPrice && "active"}>
            {data.price}$
          </p>
        </div>
        {/* <div style={{ fontSize: "24px" }}>
          <StarRatingComponent
            name="rate1"
            starCount={5}
            value={rating}
            onStarClick={onStarClick}
            editing={props.ratingEditing}
          />
        </div> */}
        <Button
          size="sm"
          variant="primary"
          className="mr-1"
          onClick={() => props.onExplore(data._id)}
          value="Explore"
        />
        <Button
          onClick={() => props.addToCart(data)}
          size="sm"
          variant="danger"
          className="ml-1"
          disabled={!props.user}
          value="Add To Cart"
        />
      </Card.Body>
    </Card>
  );
};

ProductCard.defaultProps = {
  style: {},
  ratingEditing: false,
  rating: 0,
  onExplore: function() {},
  data: { category: {} }
};

const mapStateToProps = state => ({
  user: state.auth.user
});

const mapDispatchToProps = {
  addToCart: cartActions.addToCart
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductCard);
