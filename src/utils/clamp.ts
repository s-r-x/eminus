import { isNil } from './is-nil';

export const clamp = (value: number, min: number, max: number): number => {
  if (isNil(value)) return min;
  return Math.min(Math.max(min, value), max);
};
