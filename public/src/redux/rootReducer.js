import { combineReducers } from "redux";

import auth from "./auth/reducer";
import product from "./product/reducer";

export default combineReducers({ auth, product });
