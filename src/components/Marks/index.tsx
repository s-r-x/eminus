import React from 'react';
import type { MarkLabelFormatter, RootProps } from '../../typings/root-props';
import { Range } from '../../typings/shared';
import { isInRange } from '../../utils/is-in-range';
import Mark from './Mark';

type Props = Pick<RootProps, 'min' | 'max' | 'marks' | 'vertical'> & {
  range: Range;
  onMouseDown: (value: number) => void;
  labelFormatter?: MarkLabelFormatter;
};
const Marks = (props: Props) => {
  return (
    <div className="Eminus-marks">
      {props.marks.map((mark, idx) => (
        <Mark
          vertical={props.vertical}
          labelFormatter={props.labelFormatter}
          onMouseDown={props.onMouseDown}
          isActive={isInRange(mark.value, props.range)}
          key={idx}
          min={props.min}
          max={props.max}
          mark={mark}
        />
      ))}
    </div>
  );
};
export default Marks;
