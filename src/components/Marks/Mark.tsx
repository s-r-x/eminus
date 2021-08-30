import React, { memo, CSSProperties } from 'react';
import type {
  Mark as TMark,
  MarkLabelFormatter,
  RootProps,
} from '../../typings/root-props';
import { mapNumberToPercent } from '../../utils/map-number';
import clsx from 'clsx';
import { isNil } from '../../utils/is-nil';

type Props = Pick<RootProps, 'min' | 'max' | 'vertical'> & {
  mark: TMark;
  isActive: boolean;
  onMouseDown: (value: number) => void;
  labelFormatter?: MarkLabelFormatter;
};
const Mark = (props: Props) => {
  const x = mapNumberToPercent(props.mark.value, props.min, props.max);
  const sharedStyle: CSSProperties = {
    [props.vertical ? 'top' : 'left']: x + '%',
  };
  const onMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    props.onMouseDown(props.mark.value);
  };
  return (
    <div
      className={clsx('Eminus-mark', props.isActive && 'Eminus-mark--active')}
      onTouchStart={onMouseDown}
      onMouseDown={onMouseDown}
    >
      <div style={sharedStyle} className="Eminus-mark-value" />
      {!isNil(props.mark.label) && (
        <div style={sharedStyle} className="Eminus-mark-label">
          {props.labelFormatter
            ? props.labelFormatter(props.mark.value, props.mark.label)
            : props.mark.label}
        </div>
      )}
    </div>
  );
};
export default memo(Mark);
