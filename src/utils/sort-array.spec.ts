import { sortArray } from './sort-array';

test('sortArray util', () => {
  expect(sortArray([])).toEqual([]);
  expect(sortArray([1])).toEqual([1]);
  expect(sortArray([2, 1])).toEqual([1, 2]);
  expect(sortArray([1, 2])).toEqual([1, 2]);
  expect(sortArray([-2, -3])).toEqual([-3, -2]);
  expect(sortArray([0, 0])).toEqual([0, 0]);
  expect(sortArray([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5]);
});
