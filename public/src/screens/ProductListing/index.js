import React, { Component } from "react";
import "./style.scss";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";

import api from "../../config/api";
import Header from "../../components/Header";
import Spinner from "../../components/Spinner";
import ProductCard from "../../components/ProductCard";
import Filterbox from "../../components/Filterbox";

const fakeData = {
  bannerImage:
    "http://res.cloudinary.com/deot6gwx4/image/upload/v1569790691/products/5d911ada28c66146d86def7e/apple-desk-internet-209151-1569790682440.jpg",
  title: "Macbook Air 2018",
  category: {
    name: "Laptops"
  },
  price: "800",
  discountedPrice: 0
};

class ProductListing extends Component {
  constructor(props) {
    super(props);

    const location = props.history.location;
    let query = {};

    if (location.state) {
      const { category, title } = location.state;

      if (category) query.category = category;
      if (title) query.title = title;
    }

    this.state = {
      isLoading: false,
      data: [],
      query: { ...query }
    };
  }

  componentDidMount() {
    const { query } = this.state;

    this.fetchProducts(query);
  }

  handleSubmit = (e, state) => {
    e.preventDefault();
    const query = { price: state.price };

    if (state.category) query.category = state.category;
    if (state.title) query.title = state.title;
    if (state.rating) query.rating = state.rating;

    console.log(query);

    this.fetchProducts(query);
  };

  fetchProducts = async (query = {}) => {
    try {
      this.setState({ isLoading: true });

      query.limit = 10;

      const response = await api.fetchProducts(query);
  
      this.setState({ data: response.data });
    } catch (e) {
      console.log("e =>", e);
    }

    this.setState({ isLoading: false });
  };

  navigate = id => {
    const product = this.state.data.find(item => item._id === id);

    this.props.history.push(`/product/${id}`, { product });
  };

  render() {
    const { isLoading, data, query } = this.state;

    return (
      <div id="container">
        <Header />
        <Container>
          <div className="my-3 mx-4">
            <div id="product-listing">
              <div className="filter">
                <Filterbox defaultQuery={query} onSubmit={this.handleSubmit} />
              </div>
              <div className="listing">
                {!isLoading ? (
                  <div>
                    {data.length ? (
                      <div className="d-flex flex-wrap">
                        {data.map(item => (
                          <div key={item._id} className="flex-grow-1 mx-1 my-2">
                            <ProductCard
                              onExplore={this.navigate}
                              style={{ width: "100%" }}
                              data={item}
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <h2 className="text-center mt-3">No product found</h2>
                    )}
                  </div>
                ) : (
                  <Spinner size="100px" center={true} />
                )}
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductListing);
