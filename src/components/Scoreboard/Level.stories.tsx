import { Level, LevelProps } from './Level';
import { Meta, Story } from '@storybook/react';
export default {
  title: 'Scoreboard/Level',
  component: Level,
} as Meta;

const Template: Story<LevelProps> = (args) => <Level {...args} />;

export const LevelExample = Template.bind({});
LevelExample.args = {
  children: ['easy', 'medium', 'hard'],
};
