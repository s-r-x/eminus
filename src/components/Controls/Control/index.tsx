import React, { PureComponent } from 'react';
import {
  ControlBlurFn,
  ControlFocusFn,
  PointerDownFn,
} from '../../../typings/event-fns';
import { RootProps } from '../../../typings/root-props';
import { mapNumberToPercent } from '../../../utils/map-number';

export type Props = Pick<RootProps, 'min' | 'max' | 'step' | 'vertical'> & {
  value: number;
  idx: number;
  disabled?: boolean;
  onBlur: ControlBlurFn;
  onFocus: ControlFocusFn;
  onPointerDown: PointerDownFn;
  onMouseEnter: (idx: number) => void;
  onMouseLeave: () => void;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  ariaValueText?: string;
  isDragging?: boolean;
  isActive: boolean;
};

class Control extends PureComponent<Props> {
  onBlur: React.FocusEventHandler<HTMLDivElement> = e => {
    this.props.onBlur(e, this.props.idx);
  };
  onFocus: React.FocusEventHandler<HTMLDivElement> = e => {
    this.props.onFocus(e, this.props.idx);
  };
  onMouseEnter = () => {
    this.props.onMouseEnter(this.props.idx);
  };
  onPointerDown = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.onPointerDown(e, this.props.idx);
  };
  get value(): number {
    return this.props.value;
  }
  render() {
    const { props, value } = this;
    return (
      <div
        aria-valuetext={props.ariaValueText}
        aria-disabled={props.disabled}
        aria-label={props.ariaLabel}
        aria-labelledby={props.ariaLabelledBy}
        aria-describedby={props.ariaDescribedBy}
        aria-valuemin={props.min}
        aria-valuemax={props.max}
        aria-valuenow={value}
        aria-orientation={props.vertical ? 'vertical' : 'horizontal'}
        onTouchStart={this.onPointerDown}
        onMouseDown={this.onPointerDown}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
        style={{
          [props.vertical ? 'top' : 'left']:
            mapNumberToPercent(value, props.min, props.max) + '%',
          pointerEvents:
            props.disabled || (props.isDragging && !props.isActive)
              ? 'none'
              : 'auto',
          cursor: props.isDragging && props.isActive ? 'inherit' : 'grab',
        }}
        data-idx={props.idx}
        role="slider"
        tabIndex={props.disabled ? undefined : 0}
        className="Eminus-control"
      />
    );
  }
}
export default Control;
