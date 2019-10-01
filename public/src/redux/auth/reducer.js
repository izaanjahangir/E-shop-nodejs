const initialState = {
  user: null,
  token: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      return { ...state, ...action.payload };
    case "USER_LOGOUT":
      return { ...state, user: null, token: null };
    default:
      return state;
  }
};
