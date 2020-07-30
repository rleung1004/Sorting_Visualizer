export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const tempArray = array.slice();

  mergeSort(array, 0, array.length - 1, tempArray, animations);
  return animations;
}

function mergeSort(mainArray, startIdx, endIdx, tempArray, animations) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSort(tempArray, startIdx, middleIdx, mainArray, animations);
  mergeSort(tempArray, middleIdx + 1, endIdx, mainArray, animations);
  mergeSortedArrays(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    tempArray,
    animations
  );
}

function mergeSortedArrays(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  tempArray,
  animations
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;

  while (i <= middleIdx && j <= endIdx) {
    // Comparing these values, change their colors
    animations.push([i, j]);
    // After comparing these values, revert their colors
    animations.push([i, j]);

    if (tempArray[i] <= tempArray[j]) {
      // Overwrite the value at index k in the original array with the value at index i of the temporary array
      animations.push([k, tempArray[i]]);
      mainArray[k++] = tempArray[i++];
    } else {
      // Overwrite the value at index k in the original array with the value at index j of the temporary array
      animations.push([k, tempArray[j]]);
      mainArray[k++] = tempArray[j++];
    }
  }

  while (i <= middleIdx) {
    // Comparing these values, change their colors
    animations.push([i, i]);
    // After comparing these values, revert their colors
    animations.push([i, i]);
    // Overwrite the value at index k in the original array with the value at index i in temporary array
    animations.push([k, tempArray[i]]);
    mainArray[k++] = tempArray[i++];
  }

  while (j <= endIdx) {
    // Comparing these values, change their colors
    animations.push([j, j]);
    // After comparing these values, revert their colors
    animations.push([j, j]);
    // Overwrite the value at index k in the original array with the balue at index j in temporary array
    animations.push([k, tempArray[j]]);
    mainArray[k++] = tempArray[j++];
  }
}
