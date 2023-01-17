import { Meta, Story } from '@storybook/react';
import { GameLayout, Props } from './GameLayout';
import { Top } from '../Top/Top';
import { Scoreboard } from '../Scoreboard/Scoreboard';
import { GameOver } from './GameOver';
import { Grid } from '../Grid/Grid';
import { fieldGenerator } from '../../core/__mocks__/Field';
import { Field } from '../../core/Field';

export default {
  title: 'Game/Layout',
  component: GameLayout,
} as Meta;

const Template: Story<Props> = (args) => <GameLayout {...args} />;

export const LayoutExample = Template.bind({});
LayoutExample.args = {
  top: (
    <Top
      name="Minesweeper with ReactHooks"
      feature="Flag"
      firstAction="right"
      secondAction="click"
    ></Top>
  ),
  children: (
    <>
      <Scoreboard
        time="000"
        mines="000"
        levels={['easy', 'medium', 'hard']}
        onReset={() => null}
        onChangeLevel={() => null}
        defaultLevel='easy'
      />
      <GameOver onClick={() => null} isWin={true} />
      <Grid onClick={() => null} onContextMenu={() => null}>
        {fieldGenerator(9) as Field}
      </Grid>
    </>
  ),
};
