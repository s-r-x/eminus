import React from 'react';

type PointerEvent = React.MouseEvent | React.TouchEvent;
export type ControlBlurFn = (
  e: React.FocusEvent<HTMLDivElement>,
  idx: number
) => void;
export type ControlFocusFn = ControlBlurFn;
export type OnChangeFn = (value: number[]) => void;
export type OnCompleteFn = OnChangeFn;
export type PointerDownFn = (e: PointerEvent, idx: number) => void;
