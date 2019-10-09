const initialState = {
  currentOrders: {
    isLoading: false,
    data: []
  },
  pastOrders: {
    isLoading: false,
    data: []
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "CURRENT_ORDERS_LOADING_START":
      return {
        ...state,
        currentOrders: { ...state.currentOrders, isLoading: true }
      };
    case "CURRENT_ORDERS_LOADING_END":
      return {
        ...state,
        currentOrders: { ...state.currentOrders, isLoading: false }
      };
    case "SAVE_CURRENT_ORDERS":
      return {
        ...state,
        currentOrders: { isLoading: false, data: action.payload }
      };
    case "PAST_ORDERS_LOADING_START":
      return {
        ...state,
        pastOrders: { ...state.pastOrders, isLoading: true }
      };
    case "PAST_ORDERS_LOADING_END":
      return {
        ...state,
        pastOrders: { ...state.pastOrders, isLoading: false }
      };
    case "SAVE_PAST_ORDERS":
      return {
        ...state,
        pastOrders: { isLoading: false, data: action.payload }
      };
    default:
      return state;
  }
};
