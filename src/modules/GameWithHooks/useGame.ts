/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useCallback } from 'react';
import { GameSettings, LevelNames } from '../GameSettings';
import {
  CellState,
  generateFieldWithDefaultState,
  fieldGenerator,
} from '../../core/Field';
import { Coords, Field } from '../../core/Field';
import { setFlag } from '../../core/setFlag';
import { openCell } from '../../core/OpenCell';
import { useTime } from './useTime';
import { useStatus } from './useStatus';
import { useSettings } from './useSettings';

interface ReturnType {
  level: LevelNames;
  isGameOver: boolean;
  isWin: boolean;
  settings: [number, number];
  playerField: Field;
  onClick: (coords: Coords) => void;
  onChangeLevel: (level: LevelNames) => void;
  onReset: () => void;
  gameField: Field;
  onContextMenu: (coords: Coords) => void;
  time: number;
  flagCounter: number;
  isGameStarted: boolean;
}

export const useGame = (): ReturnType => {
  const {
    settings: [size, bombs],
    level,
    setLevel,
  } = useSettings();

  const {
    isGameOver,
    isWin,
    isGameStarted,
    setNewGame,
    setInProgress,
    setGameWin,
    setGameLoose,
  } = useStatus();
  const [flagCounter, setFlagCounter] = useState(0);
  const [time, resetTime] = useTime(isGameStarted, isGameOver);

  const [playerField, setPlayerField] = useState<Field>(
    generateFieldWithDefaultState(size, CellState.hidden)
  );

  const [gameField, setGameField] = useState<Field>(
    fieldGenerator(size, bombs / (size * size))
  );

  const onClick = (coords: Coords) => {
    !isGameStarted && setInProgress();
    if (isGameOver) return;
    try {
      const [newPlayerField, isSolved] = openCell(
        coords,
        playerField,
        gameField
      );

      if (isSolved) {
        setGameWin();
      }
      setPlayerField([...newPlayerField]);
    } catch (e) {
      setPlayerField([...gameField]);
      setGameLoose();
    }
  };

  const onContextMenu = useCallback(
    (coords: Coords) => {
      !isGameStarted && setInProgress();
      const [newPlayerField, isSolved, newFlagCounter] = setFlag(
        coords,
        playerField,
        gameField,
        flagCounter,
        bombs
      );

      setFlagCounter(newFlagCounter);

      if (isSolved) {
        setGameWin();
      }
      setPlayerField([...newPlayerField]);
    },
    [isGameStarted, isGameOver, isWin, level, flagCounter]
  );

  const resetHandler = ([size, bombs]: [number, number]) => {
    const newGameField = fieldGenerator(size, bombs / (size * size));
    const newPlayerField = generateFieldWithDefaultState(
      size,
      CellState.hidden
    );

    setGameField([...newGameField]);
    setPlayerField([...newPlayerField]);
    setNewGame();
    resetTime();
    setFlagCounter(0);
  };

  const onChangeLevel = useCallback((level: LevelNames) => {
    setLevel(level as LevelNames);
    const newSettings = GameSettings[level as LevelNames];
    resetHandler(newSettings);
  }, []);

  const onReset = useCallback(() => resetHandler([size, bombs]), [size, bombs]);

  return {
    level,
    isGameOver,
    isWin,
    settings: [size, bombs],
    playerField,
    onClick,
    onChangeLevel,
    onReset,
    gameField,
    onContextMenu,
    time,
    flagCounter,
    isGameStarted,
  };
};
