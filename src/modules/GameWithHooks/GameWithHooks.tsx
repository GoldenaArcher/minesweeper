import { FC, useCallback } from 'react';
import { GameLevels, LevelNames } from '../GameSettings';
import { Wrapper } from '../../components/Game/Wrapper';
import { GameArea } from '../../components/Game/GameArea';
import { Top } from '../../components/Top/Top';
import { Scoreboard } from '../../components/Scoreboard/Scoreboard';
import { GameOver } from '../../components/Game/GameOver';
import { Grid } from '../../components/Grid/Grid';
import { useGame } from './useGame';

export const GameWithHooks: FC = () => {
  const {
    level,
    isGameOver,
    isWin,
    settings,
    playerField,
    onClick,
    onChangeLevel,
    onReset,
    onContextMenu,
    time,
  } = useGame();

  const [, bombs] = settings;

  const onChangeLevelHandler = useCallback(
    ({ target: { value: level } }: React.ChangeEvent<HTMLSelectElement>) =>
      onChangeLevel(level as LevelNames),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <Wrapper>
      <Top
        feature="Flag"
        firstAction="right"
        secondAction="click"
        name="Minesweeper"
      />
      <GameArea>
        <Scoreboard
          time={String(time)}
          mines={String(bombs)}
          levels={GameLevels as unknown as string[]}
          defaultLevel={level}
          onChangeLevel={onChangeLevelHandler}
          onReset={onReset}
        />
        {isGameOver && <GameOver onClick={onReset} isWin={isWin} />}
        <Grid onClick={onClick} onContextMenu={onContextMenu}>
          {playerField}
        </Grid>
      </GameArea>
    </Wrapper>
  );
};
