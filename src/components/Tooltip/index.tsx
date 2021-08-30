import React from 'react';
import { isNil } from '../../utils/is-nil';
import { TooltipFormatter } from '../../typings/root-props';

type Props = {
  style?: React.CSSProperties;
  content?: ReturnType<TooltipFormatter>;
};
const Tooltip = (props: Props) => {
  if (isNil(props.content) || props.content === '') return null;
  return (
    <div style={props.style} className="Eminus-tooltip">
      {props.content}
    </div>
  );
};

export default Tooltip;
