const initialState = {
  allCategories: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_ALL_CATEGORIES":
      return { ...state, allCategories: action.payload };
    default:
      return state;
  }
};
