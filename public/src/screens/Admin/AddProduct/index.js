import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";

// import Spinner from "../../../components/Spinner";
import AdminNavbar from "../../../components/Admin/AdminNavbar";
import Header from "../../../components/Header";
import "./index.scss";

class AddProduct extends Component {
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
          <h2 className="text-center">Add Product</h2>
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
)(AddProduct);
