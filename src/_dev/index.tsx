import React, { useState } from 'react';
import { render } from 'react-dom';
import Eminus, { Props } from '../';
import './style.less';

const marks: Props['marks'] = Array.from(new Array(11)).map((_, idx) => ({
  value: idx * 100,
  label: idx * 100,
}));
const ariaLabel: Props['ariaLabel'] = ['aria-label 1', 'aria-label 2'];
const ariaLabelledBy: Props['ariaLabelledBy'] = [
  'aria-labelled-by-1',
  'aria-labelled-by-2',
];
const ariaDescribedBy: Props['ariaDescribedBy'] = [
  'aria-described-by-1',
  'aria-described-by-2',
];
const ariaValueTextFormatter: Props['ariaValueTextFormatter'] = value =>
  `aria text: ${value}`;
const Root = () => {
  const [value, setValue] = useState([0, 0, 0]);
  return (
    <div className="root">
      <div className="inner">
        <Eminus
          disableCross
          ariaLabel={ariaLabel}
          ariaLabelledBy={ariaLabelledBy}
          ariaDescribedBy={ariaDescribedBy}
          ariaValueTextFormatter={ariaValueTextFormatter}
          marks={marks}
          onChange={setValue}
          value={value}
          step={1}
          min={0}
          max={1000}
        />
      </div>
    </div>
  );
};
render(<Root />, document.getElementById('root'));
