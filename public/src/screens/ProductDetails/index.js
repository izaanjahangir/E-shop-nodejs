import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Table,
  Button
} from "react-bootstrap";
import "./style.scss";

import Header from "../../components/Header";
import ProductCarousel from "../../components/ProductCarousel";

class ProductDetails extends Component {
  render() {
    return (
      <div id="container">
        <Header />
        <Container className="my-3">
          <ProductCarousel />
          {/* <div id="main" className="text-center mt-3">
            <h2 className="text-primary font-weight-bold">Infinix Hot 4</h2>
            <span>Category</span>
          </div> */}
          <Row className="mt-3" id="product-details-row">
            <Col md={8}>
              <div id="details" >
                <div id="description">
                  <h4 className="font-weight-bold">Description:</h4>
                  <ListGroup>
                    <ListGroupItem>
                      <p>
                        Cras justo odio Cras justo odio Cras justo odio Cras
                        justo odio Cras justo odio Cras justo odio Cras justo
                        odio Cras justo odio Cras justo odio Cras justo odio
                        Cras justo odio Cras justo odio Cras justo odio Cras
                        justo odio Cras justo odio Cras justo odio Cras justo
                        odio Cras justo odio Cras justo odio Cras justo odio
                        Cras justo odio Cras justo odio Cras justo odio Cras
                        justo odio Cras justo odio Cras justo odio
                      </p>
                    </ListGroupItem>
                  </ListGroup>
                </div>
                <div id="features" className="mt-3">
                  <h4 className="font-weight-bold">Features:</h4>
                  <Table striped bordered hover size="sm">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>Larry the Bird</td>
                        <td>@twitter</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </div>
            </Col>
            <Col md={4} className="product-details-side mb-3">
              <ListGroup>
                <ListGroupItem className="text-center">
                  <h4 className="text-primary font-weight-bold">Infinix Hot 4</h4>
                  <span>Category</span>
                </ListGroupItem>
                <ListGroupItem className="d-flex justify-content-between">
                  <span>300$</span>
                  <span>500$</span>
                </ListGroupItem>
                <ListGroupItem>
                  <Button variant="danger" block>
                    Add to Wishlist
                  </Button>
                  <Button variant="primary" block>
                    Add to Cart
                  </Button>
                </ListGroupItem>
              </ListGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default ProductDetails;
