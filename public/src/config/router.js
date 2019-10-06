import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "../screens/Home";
import ProductDetails from "../screens/ProductDetails";
import ProductListing from "../screens/ProductListing";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Profile from "../screens/Profile";
import Cart from "../screens/Cart";
import Success from "../screens/Cart/Success";

// Admin pages
import AdminHome from "../screens/Admin/Home";
import AddCategory from "../screens/Admin/AddCategory";
import AddProduct from "../screens/Admin/AddProduct";

export default () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/product" exact component={ProductListing} />
      <Route path="/product/:id" exact component={ProductDetails} />
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <Route path="/user/cart" exact component={Cart} />
      <Route path="/user/:id" exact component={Profile} />
      <Route path="/payment/success" exact component={Success} />
      {/* Admin Routes */}
      <Route path="/admin" exact component={AdminHome} />
      <Route path="/admin/addcategory" exact component={AddCategory} />
      <Route path="/admin/addproduct" exact component={AddProduct} />
    </Switch>
  </BrowserRouter>
);
