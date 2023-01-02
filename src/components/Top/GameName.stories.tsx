import { GameName, GameNameProps } from './GameName';
import { Meta, Story } from '@storybook/react';

export default {
  title: 'top/GameName',
  component: GameName,
} as Meta;

const Template: Story<GameNameProps> = (args) => <GameName {...args} />;

export const MinesweeperGameName = Template.bind({});

MinesweeperGameName.args = {
  name: 'minesweeper',
};
