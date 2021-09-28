import React from 'react';
import { isNil } from '../../utils/is-nil';
import { RootProps } from '../../typings/root-props';
import { mapNumberToPercent } from '../../utils/map-number';

type Props = Pick<RootProps, 'tooltipFormatter' | 'tooltipRenderer'> & {
  value: number;
  vertical?: boolean;
  min: number;
  max: number;
};
const Tooltip = (props: Props) => {
  const content = props.tooltipFormatter
    ? props.tooltipFormatter(props.value)
    : props.value;
  if (isNil(content) || content === '') return null;
  const style: React.CSSProperties = {
    [props.vertical ? 'top' : 'left']:
      mapNumberToPercent(props.value, props.min, props.max) + '%',
  };
  if (props.tooltipRenderer) {
    return props.tooltipRenderer({ style, value: props.value });
  }
  return (
    <div data-value={props.value} style={style} className="Eminus-tooltip">
      {content}
    </div>
  );
};

export default Tooltip;
