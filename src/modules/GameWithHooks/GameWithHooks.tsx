import { FC, useCallback } from 'react';
import { GameLevels, LevelNames } from '../GameSettings';
import { Scoreboard } from '../../components/Scoreboard/Scoreboard';
import { GameOver } from '../../components/Game/GameOver';
import { Grid } from '../../components/Grid/Grid';
import { useGame } from './useGame';
import { useSearchParams } from 'react-router-dom';

export const GameWithHooks: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlLevelParam = (searchParams.get('level') || undefined) as LevelNames;

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
  } = useGame(urlLevelParam);

  const [, bombs] = settings;

  const onChangeLevelHandler = useCallback(
    ({ target: { value: level } }: React.ChangeEvent<HTMLSelectElement>) => {
      setSearchParams({ level });
      onChangeLevel(level as LevelNames);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <>
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
    </>
  );
};
