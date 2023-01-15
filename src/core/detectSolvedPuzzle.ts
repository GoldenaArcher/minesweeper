import { CellState, Field } from './Field';

/**
 * detect solved puzzle based on the player and game fields coorelation
 * @date 2023-01-14
 * @param {Field} playerField
 * @param {Field} gameField
 * @returns {[boolean, number]}
 */
export const detectSolvedPuzzle = (
  playerField: Field,
  gameField: Field
): [boolean, number] => {
  const { hidden, bomb, flag, weakFlag } = CellState;

  let bombCounter = 0,
    flagCounter = 0,
    detectedBombsCounter = 0,
    hiddenCounter = 0;

  for (const y of gameField.keys()) {
    for (const x of gameField[y].keys()) {
      const gameCell = gameField[y][x],
        playerCell = playerField[y][x];

      switch (playerCell) {
        case hidden:
          hiddenCounter++;
          break;
        case flag:
        case weakFlag:
          flagCounter++;
          break;
        default:
          break;
      }

      if (gameCell === bomb) {
        bombCounter++;
        if (playerCell === flag || playerCell === weakFlag)
          detectedBombsCounter++;
      }
    }
  }

  const isPullzeSolved =
    (bombCounter === detectedBombsCounter && hiddenCounter === 0) || // all bombs have been flagged
    hiddenCounter + detectedBombsCounter === bombCounter; // the remaining cell + flagged bombs = all the bombs on the field
  return [isPullzeSolved, flagCounter];
};
