import { findNearestNumberIdx as find } from './find-nearest-number-idx';

test('findNearestNumberIdx util', () => {
  expect(find([1, 2, 3], 2)).toEqual(1);
  expect(find([0, 10], 5)).toEqual(0);
  expect(find([0, 10], 5.1)).toEqual(1);
  expect(find([1, 10], 6)).toEqual(1);
  expect(find([-10, 10], 0)).toEqual(0);
  expect(find([-10, 10], 0.1)).toEqual(1);
  expect(find([5, 10, 10], 9)).toEqual(1);
  expect(find([9, 10, 10], 10)).toEqual(1);
  expect(find([9, 10, 10], 11)).toEqual(2);
});
