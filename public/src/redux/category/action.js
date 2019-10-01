import api from "../../config/api";

const fetchAllCategories = () => async dispatch => {
  try {
    const response = await api.fetchAllCategories();

    dispatch({ type: "FETCH_ALL_CATEGORIES", payload: response });
  } catch (e) {
    console.log("e =>", e);
  }
};

export default {
  fetchAllCategories
};
