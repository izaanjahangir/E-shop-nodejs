import api from "../../config/api";
import constants from "../../config/constants";

const fetchLatestProducts = () => async dispatch => {
  try {
    dispatch({ type: "CHANGE_LOADING_LATEST_PRODUCT", payload: true });

    const response = await api.fetchProducts({ limit: 10 });

    console.log(("response =>", response));

    dispatch({ type: "FETCH_LATEST_PRODUCT", payload: response });
  } catch (e) {
    console.log("e =>", e);
    dispatch({
      type: "OPEN_MESSAGE_BOX",
      payload: { type: "error", message: e.message }
    });

    setTimeout(
      () =>
        dispatch({
          type: "CLOSE_MESSAGE_BOX"
        }),
      constants.MESSAGE_BOX_DURATION
    );
  }

  dispatch({ type: "CHANGE_LOADING_LATEST_PRODUCT", payload: false });
};

const fetchMobiles = () => async dispatch => {
  try {
    dispatch({ type: "CHANGE_LOADING_MOBILES", payload: true });

    const response = await api.fetchProducts({
      limit: 10,
      category: "5d8e6b1a9320dc4b60631729"
    });

    dispatch({ type: "FETCH_MOBILES", payload: response });
  } catch (e) {
    console.log("e =>", e);
    dispatch({
      type: "OPEN_MESSAGE_BOX",
      payload: { type: "error", message: e.message }
    });

    setTimeout(
      () =>
        dispatch({
          type: "CLOSE_MESSAGE_BOX"
        }),
      constants.MESSAGE_BOX_DURATION
    );
  }

  dispatch({ type: "CHANGE_LOADING_MOBILES", payload: false });
};

export default {
  fetchLatestProducts,
  fetchMobiles
};
