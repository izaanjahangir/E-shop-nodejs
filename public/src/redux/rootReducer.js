import { combineReducers } from "redux";

import auth from "./auth/reducer";
import loading from "./loading/reducer";
import product from "./product/reducer";
import category from "./category/reducer";

export default combineReducers({ auth, product, category, loading });
