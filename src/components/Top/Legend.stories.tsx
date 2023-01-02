import Legend from './Legend';
import { Meta, Story } from '@storybook/react';
import { LegendProps } from './Legend';

export default {
  title: 'top/Legend',
  component: Legend,
} as Meta;

const Template: Story<LegendProps> = (args) => <Legend {...args} />;

export const GameLegend = Template.bind({});
GameLegend.args = {
  feature: 'Flag: ',
  firstAction: 'ctrl',
  secondAction: 'click',
};
