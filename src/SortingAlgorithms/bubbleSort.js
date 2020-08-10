import { setArray } from "../reducers/array";
import { setCurrentBubble } from "../reducers/bubbleSort";
import { setCurrentSwappers } from "../reducers/swappers";
import { setCurrentSorted } from "../reducers/sorted";
import { setRunning } from "../reducers/running";

function bubbleSort(stateArray, dispatch, speed) {
  let array = stateArray.slice(0);
  let animations = [];
  let sorted = false;
  let i = 0;
  while (!sorted) {
    sorted = true;
    for (let j = 0; j < array.length - 1 - i; j++) {
      animations.push([j, j + 1]);
      if (array[j] > array[j + 1]) {
        animations.push([j, j + 1, true]);
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        sorted = false;
        animations.push(array.slice(0));
        animations.push([]);
      }
    }
    animations.push([true, array.length - 1 - i]);
    i++;
  }
  handleAnimations(animations, dispatch, array, speed);
  return array;
}

function handleAnimations(animations, dispatch, array, speed) {
  if (!animations.length) {
    dispatch(setCurrentBubble(array.map((num, index) => index)));
    setTimeout(() => {
      dispatch(setCurrentBubble([]));
      dispatch(setCurrentSorted(array.map((num, index) => index)));
      dispatch(setRunning(false));
    }, 900);
    return;
  }
  let dispatchFunction =
    animations[0].length > 3
      ? setArray
      : animations[0].length === 3 || animations[0].length === 0
      ? setCurrentSwappers
      : animations[0].length === 2 && typeof animations[0][0] === "boolean"
      ? setCurrentSorted
      : setCurrentBubble;
  dispatch(dispatchFunction(animations.shift()));
  setTimeout(() => {
    handleAnimations(animations, dispatch, array, speed);
  }, speed);
}

export default bubbleSort;
