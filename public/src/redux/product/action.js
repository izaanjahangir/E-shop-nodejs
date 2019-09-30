import api from "../../config/api";

const fetchLatestProducts = () => async dispatch => {
  try {
    dispatch({ type: "CHANGE_LOADING_LATEST_PRODUCT", payload: true });

    const response = await api.fetchProducts({});

    console.log(("response =>", response));

    dispatch({ type: "FETCH_LATEST_PRODUCT", payload: response });
  } catch (e) {
    console.log("e =>", e);
  }

  dispatch({ type: "CHANGE_LOADING_LATEST_PRODUCT", payload: false });
};

export default {
  fetchLatestProducts
};
