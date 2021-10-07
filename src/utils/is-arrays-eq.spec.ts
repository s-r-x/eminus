import { isArraysEq } from './is-arrays-eq';

test('isArraysEq util', () => {
  expect(isArraysEq([1], [1])).toBeTruthy();
  expect(isArraysEq([1, 2], [1, 2])).toBeTruthy();
  expect(isArraysEq([1, 2, 3, 4, 5], [1, 2, 3, 4, 5])).toBeTruthy();
  expect(isArraysEq([], [])).toBeTruthy();
  expect(isArraysEq(undefined as unknown as [], [])).toBeFalsy();
  expect(isArraysEq([1], [1, 2])).toBeFalsy();
  expect(isArraysEq([1, 2], [2, 1])).toBeFalsy();
  expect(isArraysEq([1, 2], [1, 2, 3])).toBeFalsy();
});
