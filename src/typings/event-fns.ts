import React from 'react';

export type ControlBlurFn = (
  e: React.FocusEvent<HTMLDivElement>,
  idx: number
) => void;
export type ControlFocusFn = ControlBlurFn;
export type OnChangeFn = (value: number[]) => void;
export type OnCompleteFn = OnChangeFn;
