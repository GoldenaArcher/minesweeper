import { Counter, CounterProps } from './Counter';
import { Meta, Story } from '@storybook/react';

export default {
  title: 'Scoreboard/Counter',
  component: Counter,
} as Meta;

const Template: Story<CounterProps> = (args) => <Counter {...args} />;

export const CounterExample = Template.bind({});
CounterExample.args = {
  children: '10',
};
