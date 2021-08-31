import { isNil } from './is-nil';

test('isNil util', () => {
  expect(isNil(undefined)).toBeTruthy();
  expect(isNil(null)).toBeTruthy();
  expect(isNil(0)).toBeFalsy();
  expect(isNil({})).toBeFalsy();
  expect(isNil('')).toBeFalsy();
  expect(isNil(1)).toBeFalsy();
  expect(isNil(false)).toBeFalsy();
});
