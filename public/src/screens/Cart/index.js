import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem } from "react-bootstrap";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import api from "../../config/api";
import PaymentForm from "../../components/PaymentForm";
import cartActions from "../../redux/cart/action";
import messageBoxActions from "../../redux/messageBox/action";
import loadingActions from "../../redux/loading/action";
import Button from "../../components/Button";
import constants from "../../config/constants";
import Header from "../../components/Header";
import "./index.scss";

class Cart extends Component {
  state = {
    isPaymentForm: false
  };

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

  toggleForm = isPaymentForm => {
    this.setState({ isPaymentForm });
  };

  handlePayment = async id => {
    const {
      token,
      stopLoading,
      history,
      clearCart,
      openMessageBox,
      cart
    } = this.props;

    try {
      const payload = {
        amount: this.calculateTotal() * 100,
        token: id,
        order: cart
      };

      const response = await api.charge(payload, token);

      openMessageBox({ type: "success", message: response.status });
      history.push("/payment/success", { payment: response });
      clearCart();
    } catch (e) {
      console.log("e =>", e);
      openMessageBox({ type: "error", message: e.message });
    }

    stopLoading();
  };

  render() {
    const { isPaymentForm } = this.state;
    const { cart } = this.props;

    return (
      <div id="container">
        <Header />
        <Container id="cart-page" className="my-3">
          {!!cart.length ? (
            <div className="cart">
              <ListGroup>
                {cart.map((item, i) => (
                  <CartItem
                    key={Math.random().toString()}
                    onDelete={this.handleDelete}
                    index={i}
                    item={item}
                  />
                ))}
              </ListGroup>
              <div className="my-2 text-right">
                <Button
                  onClick={this.toggleForm.bind(this, true)}
                  value={`Pay now ${this.calculateTotal()}$`}
                />
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
          <PaymentForm
            onPayment={this.handlePayment}
            onClose={this.toggleForm.bind(this, false)}
            show={isPaymentForm}
          />
        </Container>
      </div>
    );
  }
}

const CartItem = props => (
  <ListGroupItem className="cart-item">
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
  token: state.auth.token,
  cart: state.cart.cart
});

const mapDispatchToProps = {
  removeFromCart: cartActions.removeFromCart,
  clearCart: cartActions.clearCart,
  startLoading: loadingActions.startLoading,
  stopLoading: loadingActions.stopLoading,
  openMessageBox: messageBoxActions.openMessageBox
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
