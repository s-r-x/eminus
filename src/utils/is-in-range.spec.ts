import { isInRange } from './is-in-range';

test('isInRange util', () => {
  expect(isInRange(5, [1, 10])).toBeTruthy();
  expect(isInRange(1, [1, 10])).toBeTruthy();
  expect(isInRange(10, [1, 10])).toBeTruthy();
  expect(isInRange(0, [1, 10])).toBeFalsy();
  expect(isInRange(11, [1, 10])).toBeFalsy();
});
