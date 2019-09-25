import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Login from "../screens/Login";

export default () => (
  <BrowserRouter>
    <Route path="/login" exact component={Login} />
  </BrowserRouter>
);
