import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Home from "../screens/Home";
import ProductDetails from "../screens/ProductDetails";
import Login from "../screens/Login";
import Register from "../screens/Register";

export default () => (
  <BrowserRouter>
    <Route path="/" exact component={Home} />
    <Route path="/product/:id" exact component={ProductDetails} />
    <Route path="/login" exact component={Login} />
    <Route path="/register" exact component={Register} />
  </BrowserRouter>
);
