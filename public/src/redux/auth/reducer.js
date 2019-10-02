const initialState = {
  user: null,
  token: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_USER":
      return { ...state, user: { ...state.user, ...action.payload } };
    case "USER_LOGIN":
      return { ...state, ...action.payload };
    case "USER_LOGOUT":
      return { ...state, user: null, token: null };
    default:
      return state;
  }
};
