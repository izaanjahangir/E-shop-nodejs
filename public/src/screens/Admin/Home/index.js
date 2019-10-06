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

// import Spinner from "../../../components/Spinner";
import AdminNavbar from "../../../components/Admin/AdminNavbar";
import Header from "../../../components/Header";
import "./index.scss";

class Home extends Component {
  componentDidMount() {
    const { user, history } = this.props;

    if (user.role !== "admin") {
      history.replace("/");
    }
  }

  render() {
    return (
      <div id="container">
        <AdminNavbar />
        <Header searchHeader={false} />
        <Container className="my-3">
          <Tabs defaultActiveKey="current">
            <Tab eventKey="current" title="Current Orders">
              <ListGroup>
                <OrderItem orderNumber="74365738465" />
                <OrderItem orderNumber="74365738465" />
                <OrderItem orderNumber="74365738465" />
                <OrderItem orderNumber="74365738465" />
                <OrderItem orderNumber="74365738465" />
                <OrderItem orderNumber="74365738465" />
              </ListGroup>
              {/* <Spinner size="100px" center={true} /> */}
            </Tab>
            <Tab eventKey="past" title="Past Orders">
              <ListGroup>
                <OrderItem orderNumber="74365738465" />
                <OrderItem orderNumber="74365738465" />
                <OrderItem orderNumber="74365738465" />
                <OrderItem orderNumber="74365738465" />
                <OrderItem orderNumber="74365738465" />
                <OrderItem orderNumber="74365738465" />
              </ListGroup>
            </Tab>
          </Tabs>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({ user: state.auth.user });

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

const OrderItem = props => (
  <ListGroupItem className="position-relative pointer">
    <span>
      Order # <span className="font-weight-bold">{props.orderNumber}</span>
    </span>
    <Ink />
  </ListGroupItem>
);
