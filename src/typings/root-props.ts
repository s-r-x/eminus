import React, { CSSProperties } from 'react';
import {
  ControlBlurFn,
  ControlFocusFn,
  OnCompleteFn,
  OnChangeFn,
} from './event-fns';

export type MarkLabel = string | number;
export type Mark = { value: number; label?: MarkLabel };
export type MarkLabelFormatter = (
  value: number,
  label?: MarkLabel
) => string | number | React.ReactElement;

export type TooltipFormatter = (
  value: number
) => string | number | React.ReactElement;
export type AriaValueTextFormatter = (value: number) => string;

export type RootProps = {
  value: number[];
  onChange: OnChangeFn;
  onComplete?: OnCompleteFn;
  onBlur?: ControlBlurFn;
  onFocus?: ControlFocusFn;
  marks: Mark[];
  minDist?: number;
  markLabelFormatter?: MarkLabelFormatter;
  disableCross?: boolean;
  vertical?: boolean;
  step: number;
  min: number;
  max: number;
  disableTrack?: boolean;
  disabled?: boolean;
  className?: boolean;
  style?: CSSProperties;
  ariaLabel: string[];
  ariaLabelledBy: string[];
  ariaDescribedBy: string[];
  ariaValueTextFormatter?: AriaValueTextFormatter;
  tooltipFormatter?: TooltipFormatter;
  hideTooltip?: boolean;
};
