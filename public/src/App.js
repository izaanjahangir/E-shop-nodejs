import React from "react";
import { connect } from "react-redux";

import Loader from "./components/Loader";
import categoryActions from "./redux/category/action";
import Router from "./config/router";

function App(props) {
  props.fetchAllCategories();

  return (
    <div id="outside-router">
      <Router />
      {props.loading && <Loader />}
    </div>
  );
}

const mapStateToProps = state => ({ loading: state.loading.loading });

const mapDispatchToProps = {
  fetchAllCategories: categoryActions.fetchAllCategories
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
