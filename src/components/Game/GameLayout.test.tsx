import { render } from '@testing-library/react';
import { GameLayout } from './GameLayout';
import { Top } from '../Top/Top';
import { Scoreboard } from '../Scoreboard/Scoreboard';
import { GameOver } from './GameOver';
import { Grid } from '../Grid/Grid';
import { Field } from '../../core/Field';

jest.mock('../../core/Field');
const { fieldGenerator } = require('../../core/Field');

it('Top renders correctly', () => {
  const { asFragment } = render(
    <GameLayout
      top={
        <Top
          feature="Flag"
          firstAction="ctrl"
          secondAction="click"
          name="Minesweeper"
        />
      }
    >
      <Scoreboard
        time="000"
        mines="000"
        levels={['beginner', 'intermediate', 'expert']}
        onReset={() => null}
        onChangeLevel={() => null}
        defaultLevel="easy"
      />
      <GameOver onClick={() => null} isWin={true} />
      <Grid onClick={() => null} onContextMenu={() => null}>
        {fieldGenerator(9) as Field}
      </Grid>
    </GameLayout>
  );

  expect(asFragment()).toMatchSnapshot();
});
