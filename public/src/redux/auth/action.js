import api from "../../config/api";
import constants from "../../config/constants";

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

  dispatch({ type: "CHANGE_LOADING_STATE", payload: false });
};

const register = credentials => async dispatch => {
  try {
    dispatch({ type: "CHANGE_LOADING_STATE", payload: true });

    const response = await api.register(credentials);

    dispatch({ type: "CLEAR_CART" });
    dispatch({ type: "USER_LOGIN", payload: response });
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
  register,
  logout
};
