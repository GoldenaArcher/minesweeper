import { CellState, Coords, Field } from './Field';
import { detectSolvedPuzzle } from './detectSolvedPuzzle';
import { copyField } from './copyField';

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
  const newPlayerField = copyField(playerField);
  const cell = playerField[y][x];

  const { flag, weakFlag, hidden } = CellState;

  switch (cell) {
    case flag:
      newPlayerField[y][x] = weakFlag;
      break;
    case weakFlag:
      newPlayerField[y][x] = hidden;
      break;
    case hidden:
      if (prevFlagcounter < bombs) newPlayerField[y][x] = flag;
      break;
  }

  const [isSolved, flagCounter] = detectSolvedPuzzle(newPlayerField, gameField);

  return [newPlayerField, isSolved, flagCounter];
};
