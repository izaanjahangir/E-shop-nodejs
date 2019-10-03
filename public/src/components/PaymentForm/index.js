import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { CardElement, injectStripe } from "react-stripe-elements";
import { connect } from "react-redux";
import loadingActions from "../../redux/loading/action";

import Button from "../Button";

class PaymentForm extends Component {
  handleSubmit = async ev => {
    ev.preventDefault();

    const { user, startLoading, stopLoading, onClose, onPayment } = this.props;
    try {
      startLoading();

      const payload = {
        name: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      };

      let stripeResponse = await this.props.stripe.createToken(payload);

      onPayment(stripeResponse.token.id);
      onClose();
    } catch (e) {
      console.log("e =>", e);

      stopLoading();
    }
  };

  render() {
    const { show, onClose } = this.props;

    return (
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Payment form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CardElement />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleSubmit} value="Pay" variant="primary" />
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

const mapDispatchToProps = {
  startLoading: loadingActions.startLoading,
  stopLoading: loadingActions.stopLoading
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectStripe(PaymentForm));
