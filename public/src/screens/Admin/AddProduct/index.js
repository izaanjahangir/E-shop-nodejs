import React, { Component } from "react";
import {
  Container,
  Form,
  FormGroup,
  FormControl,
  FormLabel,
  Row,
  Col
} from "react-bootstrap";
import { connect } from "react-redux";

import loadingActions from "../../../redux/loading/action";
import messageBoxActions from "../../../redux/messageBox/action";
import api from "../../../config/api";
import Button from "../../../components/Button";
// import Spinner from "../../../components/Spinner";
import AdminNavbar from "../../../components/Admin/AdminNavbar";
import Header from "../../../components/Header";
import "./index.scss";

class AddProduct extends Component {
  state = {
    title: "",
    category: "",
    price: "",
    discountedPrice: "",
    features: {},
    featureKey: "",
    featureValue: "",
    images: [],
    cover: ""
  };

  componentDidMount() {
    const { user, history } = this.props;

    if (user.role !== "admin") {
      history.replace("/");
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  removeFeature = key => {
    const { features } = this.state;

    delete features[key];
    this.setState({ features });
  };

  renderFeatures = () => {
    const { features } = this.state;
    const keys = Object.keys(features);

    return keys.map(item => (
      <Row key={item} className="my-2">
        <Col xs={6}>
          <FormControl
            onDoubleClick={() => this.removeFeature(item)}
            className="pointer"
            readOnly={true}
            type="text"
            value={item}
          />
        </Col>
        <Col xs={6}>
          <FormControl disabled={true} type="text" value={features[item]} />
        </Col>
      </Row>
    ));
  };

  addFeature = () => {
    const { featureKey, featureValue, features } = this.state;

    features[featureKey] = featureValue;

    this.setState({ features, featureKey: "", featureValue: "" });
  };

  handleImage = (type, e) => {
    let images = e.target.files;

    if (type === "cover") {
      images = e.target.files[0];
    }

    this.setState({ [type]: images });
  };

  handleSubmit = async e => {
    e.preventDefault();

    const { token, startLoading, stopLoading, openMessageBox } = this.props;
    const features = this.state.features;
    const formData = new FormData();

    for (const key in features) {
      formData.append(`features[${key}]`, this.state.features[key]);
    }

    for (const key in this.state.images) {
      formData.append(`images`, this.state.images[key]);
    }

    formData.append("title", this.state.title);
    formData.append("category", this.state.category);
    formData.append("price", this.state.price);
    formData.append("discountedPrice", this.state.discountedPrice);
    formData.append("bannerImage", this.state.cover);

    try {
      startLoading();

      await api.createProduct(formData, token);
      this.clearForm();
      openMessageBox({ type: "success", message: "Product created!" });
    } catch (e) {
      openMessageBox({ type: "error", message: e.message });
      console.log("e =>", e);
    }

    stopLoading();
  };

  clearForm = () => {
    this.form.reset();

    this.setState({
      title: "",
      category: "",
      price: "",
      discountedPrice: "",
      features: {},
      featureKey: "",
      featureValue: ""
    });
  };

  render() {
    const {
      title,
      category,
      price,
      discountedPrice,
      featureKey,
      featureValue
    } = this.state;
    const { allCategories } = this.props;

    return (
      <div id="container">
        <AdminNavbar />
        <Header searchHeader={false} />
        <Container className="my-3">
          <h2 className="text-center">Add Product</h2>
          <Row className="justify-content-center">
            <Col md={6}>
              <Form ref={el => (this.form = el)} onSubmit={this.handleSubmit}>
                <FormGroup>
                  <FormLabel>Title</FormLabel>
                  <FormControl
                    type="text"
                    name="title"
                    onChange={this.handleChange}
                    value={title}
                    placeholder="Enter title"
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Category</FormLabel>
                  <FormControl
                    name="category"
                    onChange={this.handleChange}
                    value={category}
                    as="select"
                  >
                    <option value="" disabled>
                      Choose category
                    </option>
                    {allCategories.map(item => (
                      <option key={item._id} value={item._id}>
                        {item.name}
                      </option>
                    ))}
                  </FormControl>
                </FormGroup>
                <FormGroup>
                  <FormLabel>Price</FormLabel>
                  <FormControl
                    type="number"
                    value={price}
                    onChange={this.handleChange}
                    name="price"
                    placeholder="Price in $"
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Discounted Price (Optional)</FormLabel>
                  <FormControl
                    type="number"
                    value={discountedPrice}
                    onChange={this.handleChange}
                    name="discountedPrice"
                    placeholder="if any discount"
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Features</FormLabel>
                  {this.renderFeatures()}
                  <Row>
                    <Col xs={6}>
                      <FormControl
                        name="featureKey"
                        onChange={this.handleChange}
                        type="text"
                        value={featureKey}
                      />
                    </Col>
                    <Col xs={6}>
                      <FormControl
                        name="featureValue"
                        onChange={this.handleChange}
                        type="text"
                        value={featureValue}
                      />
                    </Col>
                  </Row>
                  <Button
                    className="mt-2"
                    onClick={this.addFeature}
                    value="Add Feature"
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Upload Cover</FormLabel>
                  <FormControl
                    onChange={this.handleImage.bind(this, "cover")}
                    type="file"
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Upload Images</FormLabel>
                  <FormControl
                    onChange={this.handleImage.bind(this, "images")}
                    type="file"
                    multiple
                  />
                </FormGroup>
                <FormGroup>
                  <Button type="submit" value="submit" />
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
  token: state.auth.token,
  allCategories: state.category.allCategories
});

const mapDispatchToProps = {
  startLoading: loadingActions.startLoading,
  stopLoading: loadingActions.stopLoading,
  openMessageBox: messageBoxActions.openMessageBox
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddProduct);
