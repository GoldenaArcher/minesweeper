import { Coords, Field, CellState, Cell } from './Field';

const { bomb } = CellState;

export const getNeighborsItems = ([y, x]: Coords): Record<
  string,
  [number, number]
> => ({
  top: [y - 1, x],
  topRight: [y - 1, x + 1],
  right: [y, x + 1],
  rightBottom: [y + 1, x + 1],
  bottom: [y + 1, x],
  bottomLeft: [y + 1, x - 1],
  left: [y, x - 1],
  leftTop: [y - 1, x - 1],
});

export const checkItemInField = ([y, x]: Coords, { length }: Field): boolean =>
  y >= 0 && x >= 0 && y < length && x < length;

const canBeIncremented = ([y, x]: Coords, field: Field) => +field[y][x] < +bomb;

export const incrementNeighbors = (coords: Coords, field: Field): Field => {
  const items = getNeighborsItems(coords);

  for (const item of Object.values(items)) {
    if (checkItemInField(item, field)) {
      const [y, x] = item;
      const cell = field[y][x];

      if (canBeIncremented([y, x], field))
        field[y][x] = (+cell + 1).toString() as Cell;
    }
  }

  return field;
};
