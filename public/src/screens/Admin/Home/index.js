import React, { Component } from "react";
import {
  Container,
  ListGroup,
  ListGroupItem,
  Tabs,
  Tab
} from "react-bootstrap";
import { connect } from "react-redux";
import Ink from "react-ink";

import orderAction from "../../../redux/order/action";
import Spinner from "../../../components/Spinner";
import AdminNavbar from "../../../components/Admin/AdminNavbar";
import Header from "../../../components/Header";
import "./index.scss";

class Home extends Component {
  componentDidMount() {
    const { user, history, fetchOrders, token } = this.props;

    if (user.role !== "admin") {
      history.replace("/");
      return;
    }

    fetchOrders({ token });
  }

  render() {
    const { orders } = this.props;

    return (
      <div id="container">
        <AdminNavbar />
        <Header searchHeader={false} />
        <Container className="my-3">
          <Tabs defaultActiveKey="current">
            <Tab eventKey="current" title="Current Orders">
              <OrderTab order={orders.currentOrders} />
            </Tab>
            <Tab eventKey="past" title="Past Orders">
              <OrderTab order={orders.pastOrders} />
            </Tab>
          </Tabs>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  token: state.auth.token,
  orders: state.order
});

const mapDispatchToProps = {
  fetchOrders: orderAction.fetchOrders
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

const OrderTab = props => (
  <div>
    {props.order.isLoading ? (
      <Spinner size="100px" center={true} />
    ) : (
      <div>
        {!!props.order.data.length ? (
          <ListGroup>
            {props.order.data.map(item => (
              <OrderItem key={item._id} orderNumber={item._id} />
            ))}
          </ListGroup>
        ) : (
          <h4 className="text-center my-3">No orders found</h4>
        )}
      </div>
    )}
  </div>
);

const OrderItem = props => (
  <ListGroupItem className="position-relative pointer">
    <span>
      Order # <span className="font-weight-bold">{props.orderNumber}</span>
    </span>
    <Ink />
  </ListGroupItem>
);
