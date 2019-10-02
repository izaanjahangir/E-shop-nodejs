import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Table,
  Button
} from "react-bootstrap";
import { connect } from "react-redux";
// import StarRatingComponent from "react-star-rating-component";

import "./style.scss";
import cartActions from "../../redux/cart/action";
import api from "../../config/api";
import Header from "../../components/Header";
import Spinner from "../../components/Spinner";
import ProductCarousel from "../../components/ProductCarousel";

class ProductDetails extends Component {
  state = {
    ratingEditing: true,
    isLoading: false,
    data: null
  };

  componentDidMount() {
    const path = this.props.history.location.pathname;
    const state = this.props.history.location.state;

    if (state) {
      this.setState({ data: state.product });
      return;
    }

    const id = path.split("/")[path.split("/").length - 1];
    this.loadData(id);
  }

  loadData = async id => {
    try {
      this.setState({ isLoading: true });

      const query = { id };

      const data = await api.fetchProductById(query);
      this.setState({ data });
    } catch (e) {
      console.log("e =>", e);
    }

    this.setState({ isLoading: false });
  };

  onStarClick = value => this.setState({ rating: value });

  renderFeatures = () => {
    const { data } = this.state;

    const keys = Object.keys(data.features);

    return keys.map((item, index) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{item}</td>
        <td>{data.features[item]}</td>
      </tr>
    ));
  };

  render() {
    const { isLoading, data } = this.state;
    const { user } = this.props;

    return (
      <div id="container">
        <Header />
        {data && (
          <Container className="my-3">
            {!!data.images.length && <ProductCarousel images={data.images} />}
            <Row className="mt-3" id="product-details-row">
              <Col md={8}>
                <div id="details">
                  <div id="description">
                    <h4 className="font-weight-bold">Description:</h4>
                    <ListGroup>
                      <ListGroupItem>
                        <p>{data.description || "No description available"}</p>
                      </ListGroupItem>
                    </ListGroup>
                  </div>
                  <div id="features" className="mt-3">
                    <h4 className="font-weight-bold">Features:</h4>
                    <Table striped bordered hover size="sm">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th></th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>{this.renderFeatures()}</tbody>
                    </Table>
                  </div>
                </div>
              </Col>
              <Col md={4} className="product-details-side mb-3">
                <ListGroup>
                  <ListGroupItem className="text-center">
                    <h4 className="text-primary font-weight-bold">
                      {data.title}
                    </h4>
                    <span>{data.category.name}</span>
                  </ListGroupItem>
                  <ListGroupItem
                    className={
                      "d-flex justify-content-between" +
                        !data.discountedPrice && " text-center"
                    }
                  >
                    {!!data.discountedPrice && (
                      <span>{data.discountedPrice}$</span>
                    )}
                    <span>{data.price}$</span>
                  </ListGroupItem>
                  {/* <ListGroupItem>
                    <div
                      className="d-flex justify-content-center"
                      style={{ fontSize: "24px" }}
                    >
                      <StarRatingComponent
                        name="rate1"
                        starCount={5}
                        value={data.rating}
                        onStarClick={this.onStarClick}
                        editing={ratingEditing}
                      />
                    </div>
                  </ListGroupItem> */}
                  <ListGroupItem>
                    {/* <Button variant="danger" block>
                      Add to Wishlist
                    </Button> */}
                    <Button
                      onClick={() => this.props.addToCart(data)}
                      disabled={!user}
                      variant="primary"
                      block
                    >
                      Add to Cart
                    </Button>
                  </ListGroupItem>
                </ListGroup>
              </Col>
            </Row>
          </Container>
        )}
        {isLoading && <Spinner size="100px" center="auto" />}
      </div>
    );
  }
}

const mapStateToProps = state => ({ user: state.auth.user });

const mapDispatchToProps = {
  addToCart: cartActions.addToCart
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetails);
