function quickSort(stateArray, dispatch, speed) {
  let array = stateArray.slice(0);
  let animations = [];
  quickSortHelper(array, 0, array.length - 1, animations);
  handleAnimations(animations, dispatch, array, speed);
  return array;
}

function quickSortHelper(array, startIdx, endIdx, animations) {
  if (startIdx >= endIdx) {
    return;
  }
  let pivot = startIdx;
  let left = startIdx + 1;
  let right = endIdx;

  while (right >= left) {
    if (array[right] < array[pivot] && array[left] > array[pivot]) {
      let temp = array[right];
      array[right] = array[left];
      array[left] = temp;
    }

    if (array[right] >= array[pivot]) {
      right--;
    }

    if (array[left] <= array[pivot]) {
      left++;
    }
  }

  if (pivot !== right) {
    let temp = array[right];
    array[right] = array[pivot];
    array[pivot] = temp;
  }

  quickSortHelper(array, startIdx, right - 1, animations);
  quickSortHelper(array, right + 1, endIdx, animations);
}

function handleAnimations(animations, dispatch, array, speed) {}
