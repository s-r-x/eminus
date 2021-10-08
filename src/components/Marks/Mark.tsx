import React from 'react';
import type {
  Mark as TMark,
  MarkLabelFormatter,
} from '../../typings/root-props';
import { mapNumberToPercent } from '../../utils/map-number';
import clsx from 'clsx';
import { clamp } from '../../utils/clamp';

type Props = {
  vertical?: boolean;
  mark: TMark;
  min: number;
  max: number;
  isActive: boolean;
  onMouseDown: (value: number) => void;
  labelFormatter?: MarkLabelFormatter;
};

class Mark extends React.PureComponent<Props> {
  onMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.onMouseDown(this.value);
  };
  get label(): React.ReactElement | string | number {
    return this.props.labelFormatter
      ? this.props.labelFormatter(this.props.mark)
      : typeof this.props.mark === 'number'
      ? this.props.mark
      : this.props.mark.label || this.props.mark.value;
  }
  get value(): number {
    return typeof this.props.mark === 'number'
      ? this.props.mark
      : this.props.mark.value;
  }
  get sharedStyle(): React.CSSProperties {
    const x = mapNumberToPercent(this.value, this.props.min, this.props.max);
    return {
      [this.props.vertical ? 'top' : 'left']: clamp(x, 0, 100) + '%',
    };
  }
  render() {
    const { sharedStyle } = this;
    return (
      <div
        className={clsx(
          'Eminus-mark',
          this.props.isActive && 'Eminus-mark--active'
        )}
        onTouchStart={this.onMouseDown}
        onMouseDown={this.onMouseDown}
      >
        <div style={sharedStyle} className="Eminus-mark-value" />
        <div style={sharedStyle} className="Eminus-mark-label">
          {this.label}
        </div>
      </div>
    );
  }
}
export default Mark;
