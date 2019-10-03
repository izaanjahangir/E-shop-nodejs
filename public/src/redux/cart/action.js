const addToCart = payload => dispatch => {
  dispatch({ type: "ADD_TO_CART", payload });
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
