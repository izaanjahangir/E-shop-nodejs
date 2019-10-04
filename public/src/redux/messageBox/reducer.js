const initialState = {
  message: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "OPEN_MESSAGE_BOX":
      return { ...state, message: action.payload };
    case "CLOSE_MESSAGE_BOX":
      return { ...state, message: null };
    default:
      return state;
  }
};
