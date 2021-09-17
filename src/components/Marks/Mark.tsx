import React, { memo, CSSProperties } from 'react';
import type {
  Mark as TMark,
  MarkLabelFormatter,
  RootProps,
} from '../../typings/root-props';
import { mapNumberToPercent } from '../../utils/map-number';
import clsx from 'clsx';

type Props = Pick<RootProps, 'min' | 'max' | 'vertical'> & {
  mark: TMark;
  isActive: boolean;
  onMouseDown: (value: number) => void;
  labelFormatter?: MarkLabelFormatter;
};
const Mark = (props: Props) => {
  const value = typeof props.mark === 'number' ? props.mark : props.mark.value;
  const x = mapNumberToPercent(value, props.min, props.max);
  const sharedStyle: CSSProperties = {
    [props.vertical ? 'top' : 'left']: x + '%',
  };
  const onMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    props.onMouseDown(value);
  };
  const label = props.labelFormatter
    ? props.labelFormatter(props.mark)
    : typeof props.mark === 'number'
    ? props.mark
    : props.mark.label || props.mark.value;
  return (
    <div
      className={clsx('Eminus-mark', props.isActive && 'Eminus-mark--active')}
      onTouchStart={onMouseDown}
      onMouseDown={onMouseDown}
    >
      <div style={sharedStyle} className="Eminus-mark-value" />
      <div style={sharedStyle} className="Eminus-mark-label">
        {label}
      </div>
    </div>
  );
};
export default memo(Mark);
