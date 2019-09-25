import { createStore } from "redux";

// Root Reducer
import rootReducer from "./rootReducer";

const store = createStore(rootReducer);

export default store;
