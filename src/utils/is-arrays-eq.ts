type Arr = number[];
export const isArraysEq = (arr1: Arr, arr2: Arr): boolean => {
  const len1 = arr1.length,
    len2 = arr2.length;
  if (len1 !== len2) return false;
  else if (len1 === 0 && len2 === 0) return true;
  else if (len1 === 1 && len2 === 1) return arr1[0] === arr2[0];
  else if (len1 === 2 && len2 === 2) {
    return arr1[0] === arr2[0] && arr1[1] === arr2[1];
  }
  return !arr1.some((v, idx) => v !== arr2[idx]);
};
