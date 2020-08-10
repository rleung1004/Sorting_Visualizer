import { setArray } from "../reducers/array";
import { setCurrentMerge } from "../reducers/mergeSort";
import { setCurrentSwappers } from "../reducers/swappers";
import { setCurrentSorted } from "../reducers/sorted";
import { setRunning } from "../reducers/running";

function mergeSort(stateArray, dispatch, speed) {
  let array = stateArray.slice(0);
  let animations = [];

  let finalArray = mergeSortHelper(
    array.map((num, idx) => [num, idx]),
    animations,
    0,
    array.length - 1,
    { array: array.slice(0) }
  );

  handleAnimations(animations, dispatch, finalArray, speed);
  return finalArray;
}

function mergeSortHelper(array, animations, startIdx, endIdx, obj) {
  if (array.length === 1) {
    return array;
  }
  let half = Math.floor(array.length / 2);
  let first = array.slice(0, half);
  let second = array.slice(half);
  let middleIdx = Math.floor((endIdx + 1 + startIdx) / 2);
  let actualFirst = mergeSortHelper(
    first,
    animations,
    startIdx,
    middleIdx - 1,
    obj
  );
  let actualSecond = mergeSortHelper(
    second,
    animations,
    middleIdx,
    endIdx,
    obj
  );
  let isFinalMerge = false;

  if (actualFirst.length + actualSecond.length === obj.array.length)
    isFinalMerge = true;

  return actualSort(
    actualFirst,
    actualSecond,
    animations,
    obj,
    startIdx,
    endIdx,
    isFinalMerge
  );
}

function actualSort(
  first,
  second,
  animations,
  obj,
  startIdx,
  endIdx,
  isFinalMerge
) {
  let sortedArray = [];
  let indexToPush = startIdx;

  while (first.length && second.length) {
    animations.push([first[0][1], second[0][1]]);

    if (first[0][0] <= second[0][0]) {
      indexToPush++;
      sortedArray.push(first.shift());
    } else {
      animations.push([first[0][1], second[0][1], true]);
      second[0][1] = indexToPush++;
      sortedArray.push(second.shift());
      first.forEach((subArr) => subArr[1]++);
      if (startIdx === 0) {
        obj.array = sortedArray
          .map((subArr) => subArr[0])
          .concat(first.map((subArr) => subArr[0]))
          .concat(second.map((subArr) => subArr[0]))
          .concat(obj.array.slice(endIdx + 1));
      } else {
        obj.array = obj.array
          .slice(0, startIdx)
          .concat(sortedArray.map((subArr) => subArr[0]))
          .concat(first.map((subArr) => subArr[0]))
          .concat(second.map((subArr) => subArr[0]))
          .concat(obj.array.slice(endIdx + 1));
      }
      animations.push(obj.array.concat([indexToPush - 1, indexToPush]));
      animations.push([]);
    }
    if (isFinalMerge) animations.push([true, indexToPush - 1]);
  }
  return sortedArray.concat(first).concat(second);
}

function handleAnimations(animations, dispatch, array, speed) {
  if (!animations.length) {
    dispatch(setCurrentMerge(array.map((num, index) => index)));
    setTimeout(() => {
      dispatch(setCurrentMerge([]));
      dispatch(setCurrentSorted(array.map((num, index) => index)));
      dispatch(setRunning(false));
    }, 900);
    return;
  }

  let dispatchFunction =
    animations[0].length > 3
      ? setArray
      : (animations[0].length === 3 && typeof animations[0][2] === "boolean") ||
        animations[0].length === 0
      ? setCurrentSwappers
      : animations[0].length === 2 && typeof animations[0][0] === "boolean"
      ? setCurrentSorted
      : setCurrentMerge;

  if (dispatchFunction === setArray) {
    let currentAnimation = animations.shift();
    dispatch(
      dispatchFunction(currentAnimation.slice(0, currentAnimation.length - 2))
    );
    dispatch(setCurrentSwappers([]));
    dispatch(setCurrentMerge([]));
    dispatch(
      setCurrentSwappers([
        currentAnimation[currentAnimation.length - 2],
        currentAnimation[currentAnimation.length - 1],
      ])
    );
    dispatch(
      setCurrentMerge([
        currentAnimation[currentAnimation.length - 2],
        currentAnimation[currentAnimation.length - 1],
      ])
    );
  } else {
    dispatch(dispatchFunction(animations.shift()));
  }

  setTimeout(() => {
    handleAnimations(animations, dispatch, array, speed);
  }, speed);
}

export default mergeSort;
