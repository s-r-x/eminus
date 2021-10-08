import React from 'react';
import {
  ControlBlurFn,
  ControlFocusFn,
  PointerDownFn,
} from '../../typings/event-fns';
import { RootProps } from '../../typings/root-props';
import Control from './Control';

const defaultProps: Required<
  Pick<RootProps, 'ariaLabel' | 'ariaLabelledBy' | 'ariaDescribedBy'>
> = {
  ariaLabel: [],
  ariaLabelledBy: [],
  ariaDescribedBy: [],
};
type Props = typeof defaultProps &
  Pick<RootProps, 'disabled' | 'ariaValueTextFormatter' | 'vertical'> & {
    min: number;
    max: number;
    step: number;
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
          isDragging={props.isDragging}
          isActive={props.activeIdx === idx}
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
Controls.defaultProps = defaultProps;

export default Controls;
