import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import thunk from "redux-thunk";

// Root Reducer
import rootReducer from "./rootReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["category", "auth", "cart"]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);

store.subscribe(() => console.log("store =>", store.getState()));

export default store;
