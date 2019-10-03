import React from "react";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.scss";

import constants from "../../config/constants";
import Header from "../../components/Header";

const Success = props => {
  const location = props.history.location;
  if (!location.state) return props.history.replace("/");

  const payment = location.state.payment;

  return (
    <div id="container">
      <Header />
      <Container className="text-center my-3">
        <FontAwesomeIcon
          className="check-icon"
          icon={constants.icons["faCheckCircle"]}
        />
        <h2 className="mt-2">Payment Success</h2>
        <h5>Thank you for shopping with us</h5>
        <a
          rel="noopener noreferrer"
          target="_blank"
          href={payment.receipt_url}
          className="btn btn-primary btn-sm mt-2"
        >
          Download receipt
        </a>
      </Container>
    </div>
  );
};

export default Success;
