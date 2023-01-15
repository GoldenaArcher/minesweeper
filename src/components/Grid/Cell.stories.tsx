import { Meta, Story } from '@storybook/react';
import Cell, { CellProps } from './Cell';
import { CellState } from '../../core/Field';

export default {
  title: 'Grid/Cell',
  component: Cell,
  argTypes: {
    coords: { defaultValue: [1, 1] },
  },
} as Meta;

const Template: Story<CellProps> = (args) => <Cell {...args} />;

export const CellClosed = Template.bind({});
CellClosed.args = {
  children: CellState.hidden,
};

export const CellEmpty = Template.bind({});
CellEmpty.args = {
  children: CellState.empty,
};

export const CellBomb = Template.bind({});
CellBomb.args = {
  children: CellState.bomb,
};

export const CellFlag = Template.bind({});
CellFlag.args = {
  children: CellState.flag,
};

export const CellWeakFlag = Template.bind({});
CellWeakFlag.args = {
  children: CellState.weakFlag,
};

export const CellWithNumber = Template.bind({});
CellWithNumber.args = {
  children: '1',
};
