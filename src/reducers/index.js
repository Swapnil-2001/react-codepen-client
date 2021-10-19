import { combineReducers } from "redux";

import auth from "./auth";
import pen from "./pen";

export const reducers = combineReducers({ auth, pen });
