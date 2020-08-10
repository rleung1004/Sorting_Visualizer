import { setArray } from "../reducers/array";
import { setCurrentHeap } from "../reducers/heapSort";
import { setCurrentSwappers } from "../reducers/swappers";
import { setCurrentSorted } from "../reducers/sorted";
import { setRunning } from "../reducers/running";

function heapSort(stateArray, dispatch, speed) {
  let array = stateArray.slice(0);
  let animations = [];
  buildMaxHeap(array, animations);
  let endIdx = array.length - 1;
  while (endIdx > 0) {
    let temp = array[endIdx];
    array[endIdx] = array[0];
    array[0] = temp;
    animations.push([0, endIdx, true]);
    animations.push(array.slice(0));
    animations.push([]);
    animations.push([true, endIdx]);
    heapify(array, 0, endIdx, animations);
    endIdx--;
  }
  animations.push([true, endIdx]);
  handleAnimations(animations, dispatch, array, speed);
  return array;
}

function buildMaxHeap(array, animations) {
  let currentIdx = Math.floor(array.length / 2);
  while (currentIdx >= 0) {
    heapify(array, currentIdx, array.length, animations);
    currentIdx--;
  }
}

function heapify(array, startIdx, endIdx, animations) {
  if (startIdx >= Math.floor(endIdx / 2)) {
    return;
  }

  let left = startIdx * 2 + 1;
  let right = startIdx * 2 + 2 < endIdx ? startIdx * 2 + 2 : null;
  let swap;

  if (right) {
    animations.push([startIdx, left, right]);
    swap = array[left] > array[right] ? left : right;
  } else {
    animations.push([startIdx, left]);
    swap = left;
  }

  if (array[startIdx] < array[swap]) {
    let temp = array[swap];
    array[swap] = array[startIdx];
    array[startIdx] = temp;
    animations.push([startIdx, swap, true]);
    animations.push(array.slice(0));
    animations.push([]);
    heapify(array, swap, endIdx, animations);
  }
}

function handleAnimations(animations, dispatch, array, speed) {
  if (!animations.length) {
    dispatch(setCurrentHeap(array.map((num, idx) => idx)));
    setTimeout(() => {
      dispatch(setCurrentHeap([]));
      dispatch(setRunning(false));
    }, 900);
    return;
  }

  let dispatchFunction =
    animations[0].length > 3
      ? setArray
      : (animations[0].length === 3 && typeof animations[0][3] === "boolean") ||
        !animations[0].length
      ? setCurrentSwappers
      : animations[0].length === 2 && typeof animations[0][0] === "boolean"
      ? setCurrentSorted
      : setCurrentHeap;

  dispatch(dispatchFunction(animations.shift()));

  setTimeout(() => {
    handleAnimations(animations, dispatch, array, speed);
  }, speed);
}

export default heapSort;
