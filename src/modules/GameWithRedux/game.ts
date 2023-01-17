import { CellState, Coords, Field } from '../../core/Field';
import { LevelNames, GameSettings } from '../GameSettings';
import { generateFieldWithDefaultState } from '../../core/Field';
import { fieldGenerator } from '../../core/Field';
import { AnyAction } from 'redux';

export interface State {
  level: LevelNames;
  time: number;
  bombs: number;
  isGameOver: boolean;
  isGameStarted: boolean;
  isWin: boolean;
  settings: [number, number];
  playerField: Field;
  gameField: Field;
  flagCounter: number;
}

export const getInitialState = (): State => {
  const level = 'easy';
  const settings = GameSettings[level];
  const [size, bombs] = settings;

  return {
    level,
    time: 0,
    bombs,
    isGameOver: false,
    isGameStarted: false,
    isWin: false,
    settings,
    flagCounter: 0,
    playerField: generateFieldWithDefaultState(size, CellState.hidden),
    gameField: fieldGenerator(size, bombs / (size * size)),
  };
};

// actions
const OPEN_CELL = 'modules/GameWithRedux/OPEN_CELL';

// action creators
export const openCell = (coords: Coords): AnyAction => ({
  type: OPEN_CELL,
  payload: { coords },
});
