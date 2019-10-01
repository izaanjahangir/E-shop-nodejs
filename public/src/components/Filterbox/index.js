import React, { Component } from "react";
import { Form, FormGroup, FormControl, Button } from "react-bootstrap";
import { connect } from "react-redux";

import "./style.scss";

class Filterbox extends Component {
  state = {
    category: "",
    title: "",
    price: 1000,
    rating: ""
  };

  componentDidMount() {
    this.setState({ ...this.props.defaultQuery });
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { category, title, price, rating } = this.state;
    const { allCategories, onSubmit } = this.props;

    return (
      <div id="filter-box">
        <Form onSubmit={e => onSubmit(e, { ...this.state })}>
          <FormGroup>
            <Form.Label>Category</Form.Label>
            <FormControl
              name="category"
              value={category}
              onChange={this.handleChange}
              as="select"
            >
              <option value="" disabled>
                Search By Category
              </option>
              {allCategories.map(item => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </FormControl>
          </FormGroup>
          <FormGroup>
            <Form.Label>Title</Form.Label>
            <FormControl
              value={title}
              onChange={this.handleChange}
              name="title"
              type="text"
              placeholder="Search in title"
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>Rating</Form.Label>
            <FormControl
              value={rating}
              onChange={this.handleChange}
              name="rating"
              type="number"
              min="0"
              max="5"
              step="0.5"
              placeholder="Search by rating"
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>Price</Form.Label>
            <input
              min="1000"
              max="100000000"
              onChange={this.handleChange}
              name="price"
              value={price}
              type="range"
              className="custom-range"
            />
            <div className="text-center price-slider-labels">
              <span>{price}$</span>
            </div>
          </FormGroup>
          <FormGroup>
            <Button type="submit" variant="primary" block>
              Search
            </Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

Filterbox.defaultProps = {
  onSubmit: function(e) {
    e.preventDefault();
  },
  defaultQuery: {}
};

const mapStateToProps = state => ({
  allCategories: state.category.allCategories
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filterbox);
