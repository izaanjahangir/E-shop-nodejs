import api from "../../config/api";

const updateUser = user => dispatch =>
  dispatch({ type: "UPDATE_USER", payload: user });

const login = credentials => async dispatch => {
  try {
    dispatch({ type: "CHANGE_LOADING_STATE", payload: true });

    const response = await api.login(credentials);

    dispatch({ type: "CLEAR_CART" });
    dispatch({ type: "USER_LOGIN", payload: response });
  } catch (e) {
    console.log("e =>", e);
  }

  dispatch({ type: "CHANGE_LOADING_STATE", payload: false });
};

const logout = () => dispatch => {
  try {
    dispatch({ type: "CLEAR_CART" });
    dispatch({ type: "USER_LOGOUT" });
  } catch (e) {
    console.log("e =>", e);
  }
};

export default {
  updateUser,
  login,
  logout
};
