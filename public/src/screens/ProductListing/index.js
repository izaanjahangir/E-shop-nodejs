import React, { Component } from "react";
import "./style.scss";
import { Container } from "react-bootstrap";

import Header from "../../components/Header";
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
  render() {
    return (
      <div id="container">
        <Header />
        <Container>
          <div className="my-3 mx-4">
            <div id="product-listing">
              <div className="filter">
                <Filterbox />
              </div>
              <div className="listing">
                <div className="d-flex flex-wrap">
                  <div className="flex-grow-1 mx-1 my-2">
                    <ProductCard style={{ width: "100%" }} data={fakeData} />
                  </div>
                  <div className="flex-grow-1 mx-1 my-2">
                    <ProductCard style={{ width: "100%" }} data={fakeData} />
                  </div>
                  <div className="flex-grow-1 mx-1 my-2">
                    <ProductCard style={{ width: "100%" }} data={fakeData} />
                  </div>
                  <div className="flex-grow-1 mx-1 my-2">
                    <ProductCard style={{ width: "100%" }} data={fakeData} />
                  </div>
                  <div className="flex-grow-1 mx-1 my-2">
                    <ProductCard style={{ width: "100%" }} data={fakeData} />
                  </div>
                  <div className="flex-grow-1 mx-1 my-2">
                    <ProductCard style={{ width: "100%" }} data={fakeData} />
                  </div>
                  <div className="flex-grow-1 mx-1 my-2">
                    <ProductCard style={{ width: "100%" }} data={fakeData} />
                  </div>
                  <div className="flex-grow-1 mx-1 my-2">
                    <ProductCard style={{ width: "100%" }} data={fakeData} />
                  </div>
                  <div className="flex-grow-1 mx-1 my-2">
                    <ProductCard style={{ width: "100%" }} data={fakeData} />
                  </div>
                  <div className="flex-grow-1 mx-1 my-2">
                    <ProductCard style={{ width: "100%" }} data={fakeData} />
                  </div>
                  <div className="flex-grow-1 mx-1 my-2">
                    <ProductCard style={{ width: "100%" }} data={fakeData} />
                  </div>
                  <div className="flex-grow-1 mx-1 my-2">
                    <ProductCard style={{ width: "100%" }} data={fakeData} />
                  </div>
                  <div className="flex-grow-1 mx-1 my-2">
                    <ProductCard style={{ width: "100%" }} data={fakeData} />
                  </div>
                  <div className="flex-grow-1 mx-1 my-2">
                    <ProductCard style={{ width: "100%" }} data={fakeData} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

export default ProductListing;
