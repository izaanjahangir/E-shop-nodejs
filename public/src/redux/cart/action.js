import constants from "../../config/constants"

const addToCart = payload => dispatch => {
  dispatch({ type: "ADD_TO_CART", payload });
  dispatch({
    type: "OPEN_MESSAGE_BOX",
    payload: { type: "success", message: "Added to cart" }
  });
  setTimeout(
    () =>
      dispatch({
        type: "CLOSE_MESSAGE_BOX"
      }),
    constants.MESSAGE_BOX_DURATION
  );
};

const removeFromCart = payload => dispatch => {
  dispatch({ type: "REMOVE_FROM_CART", payload });
};

const clearCart = () => ({ type: "CLEAR_CART" });

export default {
  addToCart,
  removeFromCart,
  clearCart
};
