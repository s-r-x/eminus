import React, { CSSProperties } from 'react';
import {
  ControlBlurFn,
  ControlFocusFn,
  OnCompleteFn,
  OnChangeFn,
  PointerDownFn,
} from './event-fns';

export type SimpleMark = number;
export type EnhancedMark = { value: number; label?: string | number };
export type Mark = SimpleMark | EnhancedMark;
export type MarkLabelFormatter = (
  mark: Mark
) => string | number | React.ReactElement;

export type TooltipFormatter = (
  value: number
) => string | number | React.ReactElement;
export type AriaValueTextFormatter = (value: number, idx: number) => string;
export type TooltipRendererArgs = {
  style: CSSProperties;
  value: number;
};
export type TooltipRenderer = (args: TooltipRendererArgs) => React.ReactElement;

export type RootProps = {
  value: number[];
  onChange: OnChangeFn;
  onComplete?: OnCompleteFn;
  onBlur?: ControlBlurFn;
  onFocus?: ControlFocusFn;
  onPointerDown?: PointerDownFn;
  marks: Mark[];
  minDist?: number;
  markLabelFormatter?: MarkLabelFormatter;
  disableCross?: boolean;
  vertical?: boolean;
  step?: number;
  min?: number;
  max?: number;
  hideTrack?: boolean;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
  ariaLabel: string[];
  ariaLabelledBy: string[];
  ariaDescribedBy: string[];
  ariaValueTextFormatter?: AriaValueTextFormatter;
  tooltipFormatter?: TooltipFormatter;
  tooltipRenderer?: TooltipRenderer;
  hideTooltip?: boolean;
  alwaysShowTooltip?: boolean;
};
export type UncontrolledRootProps = Omit<RootProps, 'value' | 'onChange'> & {
  defaultValue: number[];
  onChange?: OnChangeFn;
};
