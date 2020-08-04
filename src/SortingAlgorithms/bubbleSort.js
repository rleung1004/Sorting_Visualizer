export function getBubbleSortAnimations(array) {
  const animations = [];
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j + 1] < array[j]) {
        let temp = array[j];
        animations.push([j, j + 1]);
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
    }
  }
  return animations;
}
