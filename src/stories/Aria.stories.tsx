import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Uncontrolled as Eminus } from '..';

export default {
  title: 'Aria',
  component: Eminus,
} as ComponentMeta<typeof Eminus>;

const Template: ComponentStory<typeof Eminus> = args => {
  return <Eminus {...args} defaultValue={[0, 25]} />;
};

export const Aria = Template.bind({});
Aria.args = {
  ariaLabel: ['label1', 'label2'],
  ariaLabelledBy: ['labelledby1', 'labelledby2'],
  ariaDescribedBy: ['describedby1', 'describedby2'],
};
