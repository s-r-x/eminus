import React, { Component } from 'react';
import { extractPointerCoords } from '../../utils/extract-pointer-coords';
import { findNearestNumberIdx } from '../../utils/find-nearest-number-idx';
import { RootProps } from '../../typings/root-props';
import Marks from '../Marks';
import Track from '../Track';
import clsx from 'clsx';
import { isEmpty } from '../../utils/is-empty';
import { Range } from '../../typings/shared';
import Controls from '../Controls';
import Tooltip from '../Tooltip';
import { mapNumberToPercent } from '../../utils/map-number';
import {
  ControlBlurFn,
  ControlFocusFn,
  PointerDownFn,
} from '../../typings/event-fns';
import { sortArray } from '../../utils/sort-array';
import memoize from 'memoize-one';
import { isNil } from '../../utils/is-nil';

type State = {
  isDragging: boolean;
  activeIdx: number;
  hoverIdx: number;
  isFocused: boolean;
  disableFocusTooltip: boolean;
};
type Props = RootProps;

class Eminus extends Component<Props, State> {
  static defaultProps: Omit<Props, 'value' | 'onChange'> = {
    min: 0,
    max: 100,
    step: 1,
    disableCross: false,
    marks: [],
    ariaLabel: [],
    ariaLabelledBy: [],
    ariaDescribedBy: [],
  };
  state: State = {
    disableFocusTooltip: false,
    isDragging: false,
    isFocused: false,
    activeIdx: -1,
    hoverIdx: -1,
  };
  // to deal with fast mousemoves
  mouseMoveState = {
    activeIdx: -1,
    values: [] as number[],
  };
  rootRef = React.createRef<HTMLDivElement>();
  // events
  handleMouseDown(value: number) {
    const nearest = findNearestNumberIdx(this.values, value);
    if (nearest === -1) return;
    this.mouseMoveState.activeIdx = nearest;
    this.mouseMoveState.values = this.values;
    this.setState({
      activeIdx: nearest,
      isDragging: true,
    });
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('touchmove', this.onMouseMove);
    window.addEventListener('mouseup', this.onMouseUp);
    window.addEventListener('touchend', this.onMouseUp);
    document.body.classList.add('EminusGlobal--dragging');
    this.moveControl(value, nearest);
    this.$focusControl(nearest);
  }
  onRootMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const point = extractPointerCoords(e);
    const value = this.extractValueFromClickPoint(
      this.props.vertical ? point.y : point.x
    );
    this.handleMouseDown(value);
  };
  onMarkMouseDown = (value: number) => {
    this.handleMouseDown(value);
  };
  onMouseMove = (e: MouseEvent | TouchEvent) => {
    e.preventDefault();
    const { activeIdx } = this;
    if (activeIdx === -1) return;
    if (this.state.hoverIdx !== -1 && !this.state.disableFocusTooltip) {
      this.setState({
        disableFocusTooltip: true,
      });
    }
    const point = extractPointerCoords(e);
    const newValue = this.extractValueFromClickPoint(
      this.props.vertical ? point.y : point.x
    );
    this.moveControl(newValue, this.mouseMoveState.activeIdx);
  };
  onMouseUp = () => {
    if (this.props.onComplete) {
      this.props.onComplete(this.mouseMoveState.values);
    }
    this.mouseMoveState.activeIdx = -1;
    this.mouseMoveState.values = [];
    this.setState({
      isDragging: false,
      activeIdx: this.state.isFocused ? this.state.activeIdx : -1,
      disableFocusTooltip: true,
    });
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('touchmove', this.onMouseMove);
    window.removeEventListener('mouseup', this.onMouseUp);
    window.removeEventListener('touchend', this.onMouseUp);
    document.body.classList.remove('EminusGlobal--dragging');
  };
  onControlPointerDown: PointerDownFn = (e, idx) => {
    this.handleMouseDown(this.values[idx]);
    if (this.props.onPointerDown) {
      this.props.onPointerDown(e, idx);
    }
  };
  onControlMouseEnter = (idx: number) => {
    if (this.state.hoverIdx === -1) {
      this.setState({ hoverIdx: idx });
    }
  };
  onControlMouseLeave = () => {
    // this.setState({ hoverIdx: -1 });
    this.setState({ hoverIdx: -1, disableFocusTooltip: true });
  };
  onControlFocus: ControlFocusFn = (e, idx) => {
    if (this.props.onFocus) {
      this.props.onFocus(e, idx);
    }
    if (!this.state.isDragging) {
      this.setState({
        disableFocusTooltip: false,
        hoverIdx: -1,
      });
    }
    this.setState({
      isFocused: true,
      activeIdx: idx,
    });
    document.addEventListener('keydown', this.onKeyDown);
  };
  onControlBlur: ControlBlurFn = (e, idx) => {
    if (idx !== this.state.activeIdx) return;
    if (this.props.onBlur) {
      this.props.onBlur(e, idx);
    }
    this.setState({
      activeIdx: -1,
    });
    document.removeEventListener('keydown', this.onKeyDown);
  };
  onKeyDown = (e: KeyboardEvent) => {
    const { key } = e;
    const idx = this.state.activeIdx;
    if (idx === -1) {
      return;
    }
    const { min, max, step } = this.props;
    const value = this.values[idx];
    if (key === 'ArrowLeft' || key === 'ArrowDown') {
      e.preventDefault();
      this.moveControl(Math.max(value - step, min), idx);
      this.setState({
        disableFocusTooltip: false,
      });
    } else if (key === 'ArrowRight' || key === 'ArrowDown') {
      e.preventDefault();
      this.moveControl(Math.min(value + step, max), idx);
      this.setState({
        disableFocusTooltip: false,
      });
    }
  };

  // utils
  $findControlByIdx(idx: number): HTMLDivElement | null {
    return this.rootRef.current?.querySelector(`[data-idx="${idx}"]`) ?? null;
  }
  $focusControl(idx: number) {
    const $el = this.$findControlByIdx(idx);
    if ($el) {
      $el.focus();
    }
  }
  extractValueFromClickPoint(global: number): number {
    const { rootRef } = this;
    if (!rootRef.current) return 0;
    const { min, max, step, vertical } = this.props;
    const rootRect = rootRef.current.getBoundingClientRect();
    const size = Math.abs(
      vertical ? rootRect.top - rootRect.bottom : rootRect.left - rootRect.right
    );
    const v = Math.max(global - (vertical ? rootRect.top : rootRect.left), 0);
    return (
      Math.round(((max - min) * Math.min(v / size, 1) + min) / step) * step
    );
  }
  generateNewValues = (value: number, idx: number): number[] => {
    const { values: currentValues } = this;
    if (currentValues.length <= 1) {
      return [value];
    } else {
      const newValues = [...currentValues];
      newValues[idx] = value;
      return newValues;
    }
  };
  _moveControl(value: number, idx: number) {
    const currentValue = this.values[idx];
    if (currentValue === value) return;
    const newValues = this.generateNewValues(value, idx);
    this.mouseMoveState.values = newValues;
    this.props.onChange(newValues);
  }
  moveControl(nextValue: number, idx: number) {
    const { values, minDist } = this;
    const { disableCross } = this.props;
    const currentValue = values[idx];
    if (currentValue === nextValue) return;
    if (values.length <= 1) {
      return this._moveControl(nextValue, idx);
    }
    const dir = nextValue - currentValue > 0 ? 1 : -1;
    const { isDeadLock, idxToSwitch: deadLockSwitchIdx } = this.genDeadLockMeta(
      idx,
      dir
    );
    let bound = { idx: -1, value: 0 };
    const boundIdx = idx + dir;
    const potentialBound = {
      idx: isDeadLock ? (deadLockSwitchIdx as number) : idx + dir,
      value: values[boundIdx],
    };
    if (!isNil(potentialBound.value)) {
      if (minDist) {
        if (dir === -1) {
          potentialBound.value += minDist;
        } else if (dir === 1) {
          potentialBound.value -= minDist;
        }
      }
      if (dir === -1 && potentialBound.value >= nextValue) {
        bound = potentialBound;
      } else if (dir === 1 && potentialBound.value <= nextValue) {
        bound = potentialBound;
      }
    }
    if (bound.idx !== -1) {
      if (disableCross && !isDeadLock) {
        this._moveControl(bound.value, idx);
      } else {
        const newValues = [...values];
        newValues[idx] = bound.value;
        newValues[bound.idx] = nextValue;
        this.mouseMoveState.activeIdx = bound.idx;
        this.mouseMoveState.values = newValues;
        this.setState({
          activeIdx: bound.idx,
        });
        this.props.onChange(newValues);
        this.$focusControl(bound.idx);
      }
    } else {
      this._moveControl(nextValue, idx);
    }
  }
  genDeadLockMeta(
    idx: number,
    dir: -1 | 1
  ): {
    isDeadLock: boolean;
    idxToSwitch?: number;
  } {
    const { disableCross } = this.props;
    const currentValue = this.values[idx];
    const isCurrentAtMin = currentValue === this.props.min;
    const isCurrentAtMax = currentValue === this.props.max;
    const maybeDeadLock =
      disableCross &&
      ((dir === 1 && isCurrentAtMin) || (dir === -1 && isCurrentAtMax));
    if (!maybeDeadLock) {
      return { isDeadLock: false };
    }
    const switchCandidates = this.values
      .map((value, idx) => ({
        value,
        idx,
      }))
      .filter(
        d => d.value === currentValue && (dir === 1 ? d.idx > idx : d.idx < idx)
      )
      .map(({ idx }) => idx);
    if (isEmpty(switchCandidates)) {
      return { isDeadLock: false };
    }
    return {
      isDeadLock: true,
      idxToSwitch:
        dir === 1
          ? Math.max(...switchCandidates)
          : Math.min(...switchCandidates),
    };
  }

  // getters
  get activeIdx(): number {
    if (this.state.isDragging) {
      return this.mouseMoveState.activeIdx;
    }
    return this.state.activeIdx;
  }
  get tooltipIdx(): number {
    const { state } = this;
    if (state.hoverIdx !== -1) return state.hoverIdx;
    if (state.disableFocusTooltip && !state.isDragging) {
      return -1;
    }
    return this.activeIdx;
  }
  get tooltipValue(): number {
    const { tooltipIdx } = this;
    if (tooltipIdx === -1) return 0;
    return this.values[tooltipIdx];
  }
  _values = memoize((derived: number[]) => sortArray(derived));
  get values(): number[] {
    if (this.state.isDragging) {
      return this.mouseMoveState.values;
    }
    return this._values(this.props.value);
  }
  get minDist(): number {
    if (!this.props.disableCross || !this.props.minDist) {
      return 0;
    }
    return this.props.minDist;
  }
  render() {
    const { props, state, tooltipIdx, tooltipValue, values } = this;
    const range: Range = [
      values.length <= 1 ? 0 : Math.min(...values),
      Math.max(...values),
    ];
    return (
      <div
        onTouchStart={this.onRootMouseDown}
        onMouseDown={this.onRootMouseDown}
        ref={this.rootRef}
        style={props.style}
        className={clsx(
          'Eminus',
          props.disabled && 'Eminus--disabled',
          props.vertical && 'Eminus--vertical',
          props.className
        )}
      >
        <Track
          vertical={props.vertical}
          min={props.min}
          max={props.max}
          disableTrack={props.disableTrack}
          range={range}
        />
        {!isEmpty(props.marks) && (
          <Marks
            vertical={props.vertical}
            labelFormatter={props.markLabelFormatter}
            onMouseDown={this.onMarkMouseDown}
            range={range}
            min={props.min}
            max={props.max}
            marks={props.marks}
          />
        )}
        {!props.hideTooltip && tooltipIdx !== -1 && (
          <Tooltip
            value={tooltipValue}
            content={
              props.tooltipFormatter
                ? props.tooltipFormatter(tooltipValue)
                : tooltipValue
            }
            style={{
              [props.vertical ? 'top' : 'left']:
                mapNumberToPercent(tooltipValue, props.min, props.max) + '%',
            }}
          />
        )}
        <Controls
          min={props.min}
          max={props.max}
          vertical={props.vertical}
          disabled={props.disabled}
          step={props.step}
          onPointerDown={this.onControlPointerDown}
          onMouseEnter={this.onControlMouseEnter}
          onMouseLeave={this.onControlMouseLeave}
          onFocus={this.onControlFocus}
          onBlur={this.onControlBlur}
          isDragging={state.isDragging}
          activeIdx={this.activeIdx}
          ariaLabel={props.ariaLabel}
          ariaLabelledBy={props.ariaLabelledBy}
          ariaDescribedBy={props.ariaDescribedBy}
          ariaValueTextFormatter={props.ariaValueTextFormatter}
          values={values}
        />
      </div>
    );
  }
}
export default Eminus;
