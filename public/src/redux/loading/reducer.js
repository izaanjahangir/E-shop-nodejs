const initialState = {
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_LOADING_STATE":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};
