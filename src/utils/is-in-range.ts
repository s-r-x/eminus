import { Range } from '../typings/shared';

export const isInRange = (value: number, [start, end]: Range): boolean => {
  return value >= Math.min(start, end) && value <= Math.max(start, end);
};
