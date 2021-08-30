export function sortArray(array: number[]): number[] {
  if (array.length <= 1) return array;
  else if (array.length === 2) {
    return array[0] > array[1] ? [array[1], array[0]] : array;
  }
  return array.slice().sort((a, b) => a - b);
}
