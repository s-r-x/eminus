import React, { useEffect, useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Eminus from '..';

export default {
  title: 'Eminus',
  component: Eminus,
} as ComponentMeta<typeof Eminus>;

const Template: ComponentStory<typeof Eminus> = args => {
  const [value, setValue] = useState(args.value);
  useEffect(() => {
    setValue(args.value);
  }, [args.value]);
  return (
    <Eminus
      {...args}
      style={args.vertical ? undefined : { width: '500px' }}
      value={value}
      onChange={setValue}
    />
  );
};

export const Playground = Template.bind({});
Playground.args = {
  value: [0, 50],
  vertical: false,
  disableCross: false,
  hideTooltip: false,
  minDist: 0,
  min: 0,
  max: 100,
  step: 1,
  marks: [0, 25, 50, 75, 100].map(value => ({
    value,
    label: value + '%',
  })),
};
