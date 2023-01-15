import { CellState, Coords, Field } from './Field';
import { checkItemInField, getNeighborsItems } from './CellsManipulator';
import { detectSolvedPuzzle } from './detectSolvedPuzzle';

/**
 * Open cell in the player field using game field info
 * @param {Coords} coords
 * @param {Field} playerField
 * @param {Field} gameField
 * @returns {Field}
 */
export const openCell = (
  coords: Coords,
  playerField: Field,
  gameField: Field
): [Field, boolean, number] => {
  const { empty, hidden, bomb, flag, weakFlag } = CellState;

  const [y, x] = coords;
  const gameCell = gameField[y][x],
    playerCell = playerField[y][x];

  if (gameCell === bomb && playerCell !== flag && playerCell !== weakFlag) {
    throw new Error('Game Over');
  }

  if (gameCell === empty && playerCell !== flag) {
    playerField[y][x] = gameCell;

    const items = getNeighborsItems(coords);

    for (const [y, x] of Object.values(items)) {
      if (checkItemInField([y, x], gameField)) {
        const playerCell = playerField[y][x];
        const gameCell = gameField[y][x];

        if (playerCell === hidden && gameCell !== bomb) {
          [playerField] = openCell([y, x], playerField, gameField);
        }
      }
    }
  }

  if (playerCell !== flag && playerCell !== weakFlag)
    playerField[y][x] = gameCell;

  const [isSolved, flagCounter] = detectSolvedPuzzle(playerField, gameField);

  return [playerField, isSolved, flagCounter];
};
