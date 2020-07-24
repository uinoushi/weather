import { combineReducers } from "redux";
import forecastReducer from "./forecast";

export default combineReducers({
  forecast: forecastReducer,
});
