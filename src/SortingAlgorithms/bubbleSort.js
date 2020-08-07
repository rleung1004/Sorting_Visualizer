import { setArray } from "../reducers/array";
import { setCurrentBubble } from "../reducers/bubbleSort";
import { setCurrentSwappers } from "../reducers/swappers";
import { setCurrentSorted } from "../reducers/sorted";
import { setRunning } from "../reducers/running";

export default function bubbleSort(stateArray, dispatch, speed) {
  let array = stateArray.slice(0);
  let toDispatch = [];
  let sorted = false;
  let i = 0;

  while (!sorted) {
    sorted = true;
    for (let j = 0; j < array.length - 1 - i; i++) {
      toDispatch.push([j, j + 1]);
      if (array[j] > array[j + 1]) {
        toDispatch.push(j, j + 1, true);
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        sorted = false;
        toDispatch.push(array.slice(0));
        toDispatch.push();
      }
    }
    toDispatch.push([true, dispatch, array, speed]);
    i++;
  }
  handleDispatch(toDispatch, dispatch, array, speed);
  return array;
}

function handleDispatch(toDispatch, dispatch, array, speed) {
  if (!toDispatch.length) {
    dispatch(setCurrentBubble(array.map((num, index) => index)));
    setTimeout(() => {
      dispatch(setCurrentBubble([]));
      dispatch(setCurrentSorted(array.map((num, index) => index)));
      dispatch(setRunning(false));
    }, 900);
    return;
  }
  let dispatchCallBack =
    toDispatch[0].length > 3
      ? setArray
      : toDispatch[0].length === 3 || toDispatch[0].length === 0
      ? setCurrentSwappers
      : toDispatch[0].length === 2 && typeof toDispatch[0][0] === "boolean"
      ? setCurrentSorted
      : setCurrentBubble;

  dispatch(dispatchCallBack(toDispatch.shift()));

  setTimeout(() => {
    handleDispatch(toDispatch, dispatch, array, speed);
  }, speed);
}
