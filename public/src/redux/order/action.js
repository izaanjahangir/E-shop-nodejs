import messageBoxActions from "../messageBox/action";
import api from "../../config/api";

const fetchOrders = payload => async dispatch => {
  fetchCurrentOrders(payload, dispatch);
  fetchPastOrders(payload, dispatch);
};

const fetchCurrentOrders = async (payload, dispatch) => {
  try {
    dispatch({ type: "CURRENT_ORDERS_LOADING_START" });

    const currentOrders = await api.fetchOrders(
      { status: "pending" },
      payload.token
    );
    dispatch({ type: "SAVE_CURRENT_ORDERS", payload: currentOrders });
  } catch (e) {
    const error = { type: "error", message: e.message };
    dispatch(messageBoxActions.openMessageBox(error));
  }
};

const fetchPastOrders = async (payload, dispatch) => {
  try {
    dispatch({ type: "PAST_ORDERS_LOADING_START" });

    const pastOrders = await api.fetchOrders(
      { status: "completed" },
      payload.token
    );
    dispatch({ type: "SAVE_PAST_ORDERS", payload: pastOrders });
  } catch (e) {
    const error = { type: "error", message: e.message };
    dispatch(messageBoxActions.openMessageBox(error));
  }
};

export default {
  fetchOrders
};
