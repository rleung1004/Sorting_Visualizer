export function getInsertionSortAnimations(array) {
  const animations = [];
  for (let i = 1; i < array.length; i++) {
    let j = i - 1;
    let temp = array[i];
    while (temp < array[j] && j >= 0) {
      array[j + 1] = array[j];
      animations.push([j + 1, j]);
      j--;
    }
    array[j + 1] = temp;
  }
  return animations;
}
