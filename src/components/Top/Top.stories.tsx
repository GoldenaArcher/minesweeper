import { Top, TopComponentType } from './Top';
import { Meta, Story } from '@storybook/react';

export default {
  title: 'Top/Top',
  component: Top,
} as Meta;

const Template: Story<TopComponentType> = (args) => <Top {...args} />;

export const TopPanel = Template.bind({});
TopPanel.args = {
  name: 'minesweeper',
  feature: 'Flag',
  firstAction: 'ctrl',
  secondAction: 'click',
};
