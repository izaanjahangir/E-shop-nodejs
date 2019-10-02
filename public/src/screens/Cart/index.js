import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem } from "react-bootstrap";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import cartActions from "../../redux/cart/action";
import Button from "../../components/Button";
// import Spinner from "../../components/Spinner";
import constants from "../../config/constants";
import Header from "../../components/Header";
import "./index.scss";

class Cart extends Component {
  componentDidMount() {
    if (!this.props.user) {
      this.props.history.replace("/");
    }
  }

  handleDelete = index => {
    const cart = [...this.props.cart];

    cart.splice(index, 1);

    this.props.removeFromCart(cart);
  };

  calculateTotal = () => {
    const { cart } = this.props;

    const reducer = (acc, item) => acc + (item.discountedPrice || item.price);

    const total = cart.reduce(reducer, 0);

    return total;
  };

  render() {
    const { cart } = this.props;

    return (
      <div id="container">
        <Header />
        <Container id="cart-page" className="my-3">
          {!!cart.length ? (
            <div class="cart">
              <ListGroup>
                {cart.map((item, i) => (
                  <CartItem
                    onDelete={this.handleDelete}
                    index={i}
                    item={item}
                  />
                ))}
              </ListGroup>
              <div className="my-2 text-right">
                <Button value={`Pay now ${this.calculateTotal()}$`} />
              </div>
            </div>
          ) : (
            <div className="empty">
              <h3>Your Cart is empty!</h3>
              <Button
                onClick={() => this.props.history.push("/product")}
                value="Explore products"
              />
            </div>
          )}
          {/* <Spinner size="100px" center={true} /> */}
        </Container>
      </div>
    );
  }
}

const CartItem = props => (
  <ListGroupItem keys={Math.random().toString()} className="cart-item">
    <Link to={`/product/${props.item._id}`}>{props.item.title}</Link>
    <div className="right">
      <span>{!!props.item.discountedPrice || props.item.price}$</span>
      <FontAwesomeIcon
        onClick={() => props.onDelete(props.index)}
        className="delete-icon"
        icon={constants.icons["faTrashAlt"]}
      />
    </div>
  </ListGroupItem>
);

const mapStateToProps = state => ({
  user: state.auth.user,
  cart: state.cart.cart
});

const mapDispatchToProps = {
  removeFromCart: cartActions.removeFromCart
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
