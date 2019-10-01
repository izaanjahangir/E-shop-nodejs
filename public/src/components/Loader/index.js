import React from "react";

import "./style.scss";
import Spinner from "../Spinner";

const Loader = () => (
  <div id="loader">
    <Spinner />
    <p>Loading</p>
  </div>
);

export default Loader;
