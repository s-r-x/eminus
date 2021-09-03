import React from 'react';
import { isNil } from '../../utils/is-nil';
import { TooltipFormatter } from '../../typings/root-props';

type Props = {
  style?: React.CSSProperties;
  content?: ReturnType<TooltipFormatter>;
  value?: number;
};
const Tooltip = (props: Props) => {
  if (isNil(props.content) || props.content === '') return null;
  return (
    <div
      data-value={props.value}
      style={props.style}
      className="Eminus-tooltip"
    >
      {props.content}
    </div>
  );
};

export default Tooltip;
