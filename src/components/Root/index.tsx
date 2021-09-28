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
import {
  ControlBlurFn,
  ControlFocusFn,
  PointerDownFn,
} from '../../typings/event-fns';
import { sortArray } from '../../utils/sort-array';
import { isNil } from '../../utils/is-nil';
import { clamp } from '../../utils/clamp';

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
  // deal with fast mousemoves
  mouseMoveState = {
    activeIdx: -1,
    values: [] as number[],
  };
  rootRef = React.createRef<HTMLDivElement>();
  // events
  handleMouseDown(value: number) {
    const nearest = findNearestNumberIdx(this.value, value);
    if (nearest === -1) return;
    this.mouseMoveState.activeIdx = nearest;
    this.mouseMoveState.values = this.value;
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
      this.props.onComplete(this.value);
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
    this.handleMouseDown(this.value[idx]);
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
    const { min, max, step } = this;
    const value = this.value[idx];
    if (key === 'ArrowLeft' || key === 'ArrowUp') {
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
    const { min, max, step } = this;
    const { vertical } = this.props;
    const rootRect = rootRef.current.getBoundingClientRect();
    const size = Math.abs(
      vertical ? rootRect.top - rootRect.bottom : rootRect.left - rootRect.right
    );
    const v = Math.max(global - (vertical ? rootRect.top : rootRect.left), 0);
    return (
      Math.round(((max - min) * Math.min(v / size, 1) + min) / step) * step
    );
  }
  generateNewValueAndCommit(value: number, idx: number) {
    const currentValue = this.value[idx];
    if (currentValue === value) return;
    const newValue = this.generateNewValue(value, idx);
    this.commitNewValue(newValue);
  }
  generateNewValue = (value: number, idx: number): number[] => {
    const { value: currentValue } = this;
    if (currentValue.length <= 1) {
      return [value];
    } else {
      const newValue = [...currentValue];
      newValue[idx] = value;
      return newValue;
    }
  };
  commitNewValue(newValue: number[]) {
    const normalized = this.normalizeValue(newValue);
    this.mouseMoveState.values = normalized;
    this.props.onChange(normalized);
  }
  moveControl(nextValue: number, idx: number) {
    const { value, minDist } = this;
    const { disableCross } = this.props;
    const currentValue = value[idx];
    if (currentValue === nextValue) return;
    if (value.length <= 1) {
      return this.generateNewValueAndCommit(nextValue, idx);
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
      value: value[boundIdx],
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
        this.generateNewValueAndCommit(bound.value, idx);
      } else {
        const newValue = [...value];
        newValue[idx] = bound.value;
        newValue[bound.idx] = nextValue;
        this.setState({
          activeIdx: bound.idx,
        });
        this.mouseMoveState.activeIdx = bound.idx;
        this.commitNewValue(newValue);
        this.$focusControl(bound.idx);
      }
    } else {
      this.generateNewValueAndCommit(nextValue, idx);
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
    const currentValue = this.value[idx];
    const isCurrentAtMin = currentValue === this.min;
    const isCurrentAtMax = currentValue === this.max;
    const maybeDeadLock =
      disableCross &&
      ((dir === 1 && isCurrentAtMin) || (dir === -1 && isCurrentAtMax));
    if (!maybeDeadLock) {
      return { isDeadLock: false };
    }
    const switchCandidates = this.value
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
  normalizeValue(value: number[]) {
    return sortArray(value.map(n => clamp(n, this.min, this.max)));
  }

  // getters
  get min(): number {
    return this.props.min as number;
  }
  get max(): number {
    return this.props.max as number;
  }
  get step(): number {
    return this.props.step as number;
  }
  get activeIdx(): number {
    if (this.state.isDragging) {
      return this.mouseMoveState.activeIdx;
    }
    return this.state.activeIdx;
  }
  get tooltipIdx(): number {
    const { state } = this;
    if (this.props.hideTooltip) return -1;
    else if (state.hoverIdx !== -1) return state.hoverIdx;
    else if (state.disableFocusTooltip && !state.isDragging) {
      return -1;
    }
    return this.activeIdx;
  }
  get value(): number[] {
    if (this.state.isDragging) {
      return this.mouseMoveState.values;
    }
    return this.normalizeValue(this.props.value);
  }
  get minDist(): number {
    if (!this.props.disableCross || !this.props.minDist) {
      return 0;
    }
    return this.props.minDist;
  }
  render() {
    const { props, state, tooltipIdx, value, min, max, step } = this;
    const range: Range = [
      value.length <= 1 ? 0 : Math.min(...value),
      Math.max(...value),
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
          min={min}
          max={max}
          hideTrack={props.hideTrack}
          range={range}
        />
        {!isEmpty(props.marks) && (
          <Marks
            vertical={props.vertical}
            labelFormatter={props.markLabelFormatter}
            onMouseDown={this.onMarkMouseDown}
            range={range}
            min={min}
            max={max}
            marks={props.marks}
          />
        )}
        {props.alwaysShowTooltip && (
          <>
            {value.map((value, idx) => (
              <Tooltip
                key={idx}
                value={value}
                tooltipFormatter={props.tooltipFormatter}
                vertical={props.vertical}
                tooltipRenderer={props.tooltipRenderer}
                min={min}
                max={max}
              />
            ))}
          </>
        )}
        {tooltipIdx !== -1 && !props.alwaysShowTooltip && (
          <Tooltip
            value={value[tooltipIdx]}
            tooltipFormatter={props.tooltipFormatter}
            vertical={props.vertical}
            tooltipRenderer={props.tooltipRenderer}
            min={min}
            max={max}
          />
        )}
        <Controls
          min={min}
          max={max}
          vertical={props.vertical}
          disabled={props.disabled}
          step={step}
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
          values={value}
        />
      </div>
    );
  }
}
export default Eminus;
