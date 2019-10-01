import React from "react";
import { connect } from "react-redux";

import categoryActions from "./redux/category/action";
import Router from "./config/router";

function App(props) {
  props.fetchAllCategories();

  return <Router />;
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  fetchAllCategories: categoryActions.fetchAllCategories
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
