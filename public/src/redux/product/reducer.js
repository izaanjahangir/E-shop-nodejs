const initialState = {
  latestProducts: {
    loading: false,
    data: [],
    skip: 0
  },
  mobiles: {
    loading: false,
    data: [],
    skip: 0
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_LATEST_PRODUCT":
      return {
        ...state,
        latestProducts: { ...state.latestProducts, data: action.payload.data }
      };
    case "CHANGE_LOADING_LATEST_PRODUCT":
      return {
        ...state,
        latestProducts: { ...state.latestProducts, loading: action.payload }
      };
    case "FETCH_MOBILES":
      return {
        ...state,
        mobiles: { ...state.mobiles, data: action.payload.data }
      };
    case "CHANGE_LOADING_MOBILES":
      return {
        ...state,
        mobiles: { ...state.mobiles, loading: action.payload }
      };
    default:
      return state;
  }
};
