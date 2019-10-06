import React, { Component } from "react";
import {
  Container,
  Form,
  Row,
  Col,
  FormGroup,
  FormLabel,
  FormControl
} from "react-bootstrap";
import { connect } from "react-redux";

import loadingActions from "../../../redux/loading/action";
import messageBoxActions from "../../../redux/messageBox/action";

import api from "../../../config/api";
// import Spinner from "../../../components/Spinner";
import Button from "../../../components/Button";
import AdminNavbar from "../../../components/Admin/AdminNavbar";
import Header from "../../../components/Header";
import "./index.scss";

class AddCategory extends Component {
  state = {
    name: "",
    image: ""
  };

  componentDidMount() {
    const { user, history } = this.props;

    if (user.role !== "admin") {
      history.replace("/");
    }
  }

  handleSubmit = async e => {
    e.preventDefault();

    const { name, image } = this.state;
    const { token, startLoading, stopLoading, openMessageBox } = this.props;

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("image", image);

      startLoading();

      await api.createCategory(formData, token);
      openMessageBox({ type: "success", message: "Category created!" });
    } catch (e) {
      console.log("e =>", e);

      openMessageBox({ type: "error", message: e.message });
    }

    this.clearForm();
    stopLoading();
  };

  handleTextChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleImageChange = e => {
    this.setState({ image: e.target.files[0] });
  };

  clearForm = () => {
    this.form.reset();
    this.setState({ name: "" });
  };

  render() {
    const { name } = this.state;

    return (
      <div id="container">
        <AdminNavbar />
        <Header searchHeader={false} />
        <Container className="my-3">
          <h2 className="text-center">Add Category</h2>
          <Row className="justify-content-center">
            <Col md={7}>
              <Form
                ref={el => (this.form = el)}
                onSubmit={this.handleSubmit}
                className="my-3"
              >
                <FormGroup>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <FormControl
                    type="text"
                    id="name"
                    value={name}
                    onChange={this.handleTextChange}
                    placeholder="Enter name..."
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="image">Choose Image</FormLabel>
                  <FormControl
                    type="file"
                    id="image"
                    onChange={this.handleImageChange}
                    placeholder="Choose image"
                  />
                </FormGroup>
                <FormGroup>
                  <Button type="submit" value="Create" />
                </FormGroup>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  token: state.auth.token
});

const mapDispatchToProps = {
  startLoading: loadingActions.startLoading,
  stopLoading: loadingActions.stopLoading,
  openMessageBox: messageBoxActions.openMessageBox
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCategory);
