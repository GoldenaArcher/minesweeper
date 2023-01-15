import { CellState, Coords, Field } from './Field';
import { detectSolvedPuzzle } from './detectSolvedPuzzle';

/**
 * Set flag to the cell
 * @date 2023-01-13
 * @param {Coords} coords:Coords
 * @param {Field} playerField:Field
 * @param {Field} gameField:Field
 * @returns {[Field, FlagCounter]}
 */
export const setFlag = (
  coords: Coords,
  playerField: Field,
  gameField: Field,
  prevFlagcounter: number,
  bombs: number
): [Field, boolean, number] => {
  const [y, x] = coords;
  const cell = playerField[y][x];

  const { flag, weakFlag, hidden } = CellState;

  switch (cell) {
    case flag:
      playerField[y][x] = weakFlag;
      break;
    case weakFlag:
      playerField[y][x] = hidden;
      break;
    case hidden:
      if (prevFlagcounter < bombs) playerField[y][x] = flag;
      break;
  }

  const [isSolved, flagCounter] = detectSolvedPuzzle(playerField, gameField);

  return [playerField, isSolved, flagCounter];
};
