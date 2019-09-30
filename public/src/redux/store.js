import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

// Root Reducer
import rootReducer from "./rootReducer";

const store = createStore(rootReducer, applyMiddleware(thunk));

store.subscribe(() => console.log("store =>", store.getState()));

export default store;
