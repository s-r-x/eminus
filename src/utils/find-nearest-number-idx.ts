type Acc = {
  nearest: number;
  nearestIdx: number;
};
export const findNearestNumberIdx = (
  array: number[],
  value: number
): number => {
  const { nearestIdx: nearest } = array.reduce(
    (acc, n, idx) => {
      const { nearest, nearestIdx } = acc;
      const dist = Math.abs(value - n);
      const newAcc: Acc = { nearestIdx: idx, nearest: dist };
      if (dist > nearest) {
        return acc;
      } else if (dist < nearest) {
        return newAcc;
      } else {
        const isIdxMoreSuitableThanCurrent =
          (value > n && idx > nearestIdx) || (value < n && idx < nearestIdx);
        if (isIdxMoreSuitableThanCurrent) return newAcc;
        else return acc;
      }
    },
    { nearestIdx: -1, nearest: Infinity } as Acc
  );
  return nearest;
};
