import { incrementNeighbors } from './CellsManipulator';
export enum CellState {
  empty = '0',
  bomb = '9',
  hidden = '10',
  flag = '11',
  weakFlag = '12',
}

export const cells = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'] as const;

export type Cell = typeof cells[number];

export type Field = Cell[][];
export type Coords = [number, number];

export const generateFieldWithDefaultState = (
  size: number,
  state: Cell = CellState.empty
): Field => Array.from(Array(size), () => new Array(size).fill(state));

export const fieldGenerator = (size: number, density: number): Field => {
  if (density > 1 || density < 0)
    throw new Error('Density must be between 0 and 1');

  let unProcessedCell = size * size,  
    restCellsWithBombs = unProcessedCell * density;

  const res: Field = generateFieldWithDefaultState(size);

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (restCellsWithBombs / unProcessedCell > Math.random()) {
        res[i][j] = CellState.bomb;
        incrementNeighbors([i, j], res);
        restCellsWithBombs--;
      }

      unProcessedCell--;
    }
  }

  return res;
};
