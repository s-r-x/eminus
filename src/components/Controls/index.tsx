import React from 'react';
import { ControlBlurFn, ControlFocusFn } from '../../typings/event-fns';
import { RootProps } from '../../typings/root-props';
import Control from './Control';

type Props = Pick<
  RootProps,
  | 'disabled'
  | 'ariaLabel'
  | 'ariaLabelledBy'
  | 'ariaDescribedBy'
  | 'ariaValueTextFormatter'
  | 'min'
  | 'max'
  | 'step'
  | 'vertical'
> & {
  activeIdx: number;
  isDragging: boolean;
  onMouseDown: (idx: number) => void;
  onMouseEnter: (idx: number) => void;
  onMouseLeave: () => void;
  onBlur: ControlBlurFn;
  onFocus: ControlFocusFn;
  values: number[];
};

const Controls = (props: Props) => {
  return (
    <div className="Eminus-handlers">
      {props.values.map((n, idx) => (
        <Control
          vertical={props.vertical}
          ariaLabel={props.ariaLabel[idx]}
          ariaLabelledBy={props.ariaLabelledBy[idx]}
          ariaDescribedBy={props.ariaDescribedBy[idx]}
          ariaValueText={
            props.ariaValueTextFormatter && props.ariaValueTextFormatter(n)
          }
          isDragging={props.isDragging && props.activeIdx === idx}
          disabled={props.disabled}
          step={props.step}
          min={props.min}
          max={props.max}
          idx={idx}
          value={n}
          key={idx}
          onBlur={props.onBlur}
          onFocus={props.onFocus}
          onMouseDown={props.onMouseDown}
          onMouseEnter={props.onMouseEnter}
          onMouseLeave={props.onMouseLeave}
        />
      ))}
    </div>
  );
};
export default Controls;
