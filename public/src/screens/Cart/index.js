import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem } from "react-bootstrap";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import Button from "../../components/Button";
import Spinner from "../../components/Spinner";
import constants from "../../config/constants";
import Header from "../../components/Header";
import "./index.scss";

class Cart extends Component {
  componentDidMount() {
    if (!this.props.user) {
      this.props.history.replace("/");
    }
  }

  render() {
    return (
      <div id="container">
        <Header />
        <Container id="cart-page" className="my-3">
          {/* <div class="cart">
            <ListGroup>
              <CartItem />
              <CartItem />
              <CartItem />
              <CartItem />
              <CartItem />
              <CartItem />
            </ListGroup>
            <div className="my-2 text-right">
              <Button value="Pay now" />
            </div>
          </div> */}
          {/* <div className="empty">
            <h3>Your Cart is empty!</h3>
            <Button
              onClick={() => this.props.history.push("/product")}
              value="Explore products"
            />
          </div> */}
          {/* <Spinner size="100px" center={true} /> */}
        </Container>
      </div>
    );
  }
}

const CartItem = () => (
  <ListGroupItem className="cart-item">
    <Link>Cras justo odio</Link>
    <div class="right">
      <span>300$</span>
      <FontAwesomeIcon
        className="delete-icon"
        icon={constants.icons["faTrashAlt"]}
      />
    </div>
  </ListGroupItem>
);

const mapStateToProps = state => ({
  user: state.auth.user
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
