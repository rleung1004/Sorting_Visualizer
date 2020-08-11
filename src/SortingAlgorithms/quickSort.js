import { setArray } from "../reducers/array";
import { setCurrentQuick, setPivot } from "../reducers/quickSort";
import { setCurrentSwappers } from "../reducers/swappers";
import { setCurrentSorted } from "../reducers/sorted";
import { setRunning } from "../reducers/running";

function quickSort(stateArray, dispatch, speed) {
  let array = stateArray.slice(0);
  let animations = [];
  quickSortHelper(array, 0, array.length - 1, animations);
  handleAnimations(animations, dispatch, array, speed);
  return array;
}

function quickSortHelper(array, startIdx, endIdx, animations) {
  if (startIdx >= endIdx) {
    animations.push([true, startIdx]);
    return;
  }
  let pivot = startIdx;
  let left = startIdx + 1;
  let right = endIdx;
  animations.push(pivot);
  animations.push([left, right]);

  while (right >= left) {
    if (array[right] < array[pivot] && array[left] > array[pivot]) {
      let temp = array[right];
      animations.push([left, right, true]);
      array[right] = array[left];
      array[left] = temp;
      animations.push([array.slice(0)]);
      animations.push([]);
    }

    if (array[right] >= array[pivot]) {
      right--;
    }

    if (array[left] <= array[pivot]) {
      left++;
    }

    if (right >= left) {
      animations.push([left, right]);
    }
  }

  animations.push([pivot, right]);

  if (pivot !== right) {
    let temp = array[right];
    array[right] = array[pivot];
    array[pivot] = temp;
    animations.push([pivot, right, true]);
    animations.push(array.slice(0));
    animations.push([]);
    animations.push([true, right]);
  }

  quickSortHelper(array, startIdx, right - 1, animations);
  quickSortHelper(array, right + 1, endIdx, animations);
}

function handleAnimations(animations, dispatch, array, speed) {
  if (!animations.length) {
    dispatch(setPivot(null));
    dispatch(setCurrentQuick(array.map((num, idx) => idx)));
    setTimeout(() => {
      dispatch(setCurrentQuick([]));
      dispatch(setRunning(false));
    }, 900);
    return;
  }

  let dispatchFunction = !(animations[0] instanceof Array)
    ? setPivot
    : animations[0].length > 3
    ? setArray
    : animations[0].length !== 2
    ? setCurrentSwappers
    : animations[0].length === 2 && typeof animations[0][0] === "boolean"
    ? setCurrentSorted
    : setCurrentQuick;

  dispatch(dispatchFunction(animations.shift()));

  if (dispatchFunction === setPivot)
    dispatch(setCurrentQuick(animations.shift()));

  setTimeout(() => {
    handleAnimations(animations, dispatch, array, speed);
  }, speed);
}

export default quickSort;
