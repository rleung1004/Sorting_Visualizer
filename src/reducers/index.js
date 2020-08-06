import { combineReducers } from "redux";
import { algorithm } from "./algorithm";
import { array } from "./array";
import { currentBubble } from "./bubbleSort";
import { currentHeap } from "./heapSort";
import { currentMerge } from "./mergeSort";
import { currentQuick, pivot } from "./quickSort";
import { isRunning } from "./running";
import { currentSorted } from "./sorted";
import { currentSwappers } from "./swappers";

export default combineReducers({
  algorithm,
  array,
  currentBubble,
  currentHeap,
  currentMerge,
  currentQuick,
  pivot,
  isRunning,
  currentSorted,
  currentSwappers,
});
