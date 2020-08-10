function heapSort(stateArray, dispatch, speed) {
  let array = stateArray.slice(0);
  buildMaxHeap(array);
  let endIdx = array.length - 1;
  while (endIdx > 0) {
    let temp = array[endIdx];
    array[endIdx] = array[0];
    array[0] = temp;
    heapify(array, 0, endIdx);
    endIdx--;
  }
  return array;
}

function buildMaxHeap(array) {
  let currentIdx = Math.floor(array.length / 2);
  while (currentIdx >= 0) {
    heapify(array, currentIdx, array.length);
    currentIdx--;
  }
}

function heapify(array, startIdx, endIdx) {
  if (startIdx >= Math.floor(endIdx / 2)) {
    return;
  }

  let left = startIdx * 2 + 1;
  let right = startIdx * 2 + 2 < end ? start * 2 + 2 : null;
  let swap;

  if (right) {
    swap = array[left] > array[right] ? left : right;
  } else {
    swap = left;
  }

  if (array[startIdx] < array[swap]) {
    let temp = array[swap];
    array[swap] = array[startIdx];
    array[startIdx] = temp;
    heapify(array, swap, end);
  }
}
