import React from 'react';
import {
  ControlBlurFn,
  ControlFocusFn,
  PointerDownFn,
} from '../../typings/event-fns';
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
  onMouseEnter: (idx: number) => void;
  onMouseLeave: () => void;
  onPointerDown: PointerDownFn;
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
            props.ariaValueTextFormatter && props.ariaValueTextFormatter(n, idx)
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
          onPointerDown={props.onPointerDown}
          onMouseEnter={props.onMouseEnter}
          onMouseLeave={props.onMouseLeave}
        />
      ))}
    </div>
  );
};
export default Controls;
