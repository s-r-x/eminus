import { clamp } from './clamp';

test('clamp util', () => {
  expect(clamp(1, 1, 10)).toEqual(1);
  expect(clamp(10, 1, 10)).toEqual(10);
  expect(clamp(0, 1, 10)).toEqual(1);
  expect(clamp(11, 1, 10)).toEqual(10);
  expect(clamp(-2, -1, 10)).toEqual(-1);
});
