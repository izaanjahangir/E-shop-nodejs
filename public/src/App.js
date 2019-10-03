import React from "react";
import { connect } from "react-redux";
import { Elements, StripeProvider } from "react-stripe-elements";

import Loader from "./components/Loader";
import categoryActions from "./redux/category/action";
import Router from "./config/router";

function App(props) {
  props.fetchAllCategories();

  return (
    <StripeProvider apiKey="pk_test_GxLP5trZb35oJ9XbjjICmbM2">
      <div id="outside-router">
        <Elements>
          <Router />
        </Elements>
        {props.loading && <Loader />}
      </div>
    </StripeProvider>
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
