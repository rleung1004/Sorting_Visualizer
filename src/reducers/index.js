import { combineReducers } from "redux";
import { algorithm } from "./algorithm";
import { array } from "./array";
import { isRunning } from "./running";
import { currentSorted } from "./sorted";
import { currentSwappers } from "./swappers";

export default combineReducers({
  algorithm,
  array,
  isRunning,
  currentSorted,
  currentSwappers,
});
