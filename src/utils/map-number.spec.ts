import { mapNumber } from './map-number';

test('mapNumber util', () => {
  expect(mapNumber(1, 1, 100, 1000, 10000)).toEqual(1000);
  expect(mapNumber(100, 1, 100, 1000, 10000)).toEqual(10000);
  expect(mapNumber(5, 0, 10, 0, 100)).toEqual(50);
  expect(mapNumber(-10, -100, -10, 10, 100)).toEqual(100);
  expect(mapNumber(-100, -100, -10, 10, 100)).toEqual(10);
  expect(mapNumber(0, -50, 50, 0, 100)).toEqual(50);
  expect(mapNumber(50, -50, 50, 0, 100)).toEqual(100);
  expect(mapNumber(-10, -10, 0, 0, 10)).toEqual(0);
  expect(mapNumber(-5, -10, 0, 0, 10)).toEqual(5);
});
