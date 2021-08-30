import React, { PureComponent } from 'react';
import { ControlBlurFn, ControlFocusFn } from '../../typings/event-fns';
import { mapNumberToPercent } from '../../utils/map-number';

type Props = {
  value: number;
  min: number;
  max: number;
  step: number;
  idx: number;
  vertical?: boolean;
  disabled?: boolean;
  onBlur: ControlBlurFn;
  onFocus: ControlFocusFn;
  onMouseDown: (idx: number) => void;
  onMouseEnter: (idx: number) => void;
  onMouseLeave: () => void;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  ariaValueText?: string;
  isDragging: boolean;
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
  onMouseDown = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.onMouseDown(this.props.idx);
  };
  render() {
    const { props } = this;
    return (
      <div
        aria-valuetext={props.ariaValueText}
        aria-disabled={props.disabled}
        aria-label={props.ariaLabel}
        aria-labelledby={props.ariaLabelledBy}
        aria-describedby={props.ariaDescribedBy}
        aria-valuemin={props.min}
        aria-valuemax={props.max}
        aria-valuenow={props.value}
        aria-orientation="horizontal"
        onTouchStart={this.onMouseDown}
        onMouseDown={this.onMouseDown}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
        style={{
          [props.vertical ? 'top' : 'left']:
            mapNumberToPercent(props.value, props.min, props.max) + '%',
          cursor: props.isDragging ? 'inherit' : 'grab',
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
