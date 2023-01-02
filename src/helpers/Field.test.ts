import { table } from 'console';
import { emptyFieldGenerator, CellState, fieldGenerator, Cell } from './Field';
const { empty, hidden, bomb } = CellState;

const cellWithBombFilter = (cell: Cell) => cell === bomb;

describe('Field Generator', () => {
  describe('emptyFieldGenerator tests', () => {
    it('1x1', () => {
      expect(emptyFieldGenerator(1)).toStrictEqual([[empty]]);
    });
    it('2x2', () => {
      expect(emptyFieldGenerator(2)).toStrictEqual([
        [empty, empty],
        [empty, empty],
      ]);
    });

    it('3x3', () => {
      expect(emptyFieldGenerator(3)).toStrictEqual([
        [empty, empty, empty],
        [empty, empty, empty],
        [empty, empty, empty],
      ]);
    });

    it('4x4', () => {
      expect(emptyFieldGenerator(4, hidden)).toStrictEqual([
        [hidden, hidden, hidden, hidden],
        [hidden, hidden, hidden, hidden],
        [hidden, hidden, hidden, hidden],
        [hidden, hidden, hidden, hidden],
      ]);
    });
  });

  describe('Simple cases', () => {
    it('Wrong density', () => {
      const errorTex = 'Density must be between 0 and 1';
      expect(() => fieldGenerator(1, -1)).toThrow(errorTex);
      expect(() => fieldGenerator(1, 2)).toThrow(errorTex);
    });

    console.log(fieldGenerator(1, 0));

    it('Smallest possible field without mine', () => {
      expect(fieldGenerator(1, 0)).toStrictEqual([[empty]]);
    });

    it('Big possible field without mine', () => {
      expect(fieldGenerator(10, 0)).toStrictEqual([
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
      ]);
    });

    it('Smallest possible field with mine', () => {
      expect(fieldGenerator(1, 1)).toStrictEqual([[bomb]]);
    });

    it('2x2 field with mines', () => {
      expect(fieldGenerator(2, 1)).toStrictEqual([
        [bomb, bomb],
        [bomb, bomb],
      ]);
    });

    it('2x2 field with 50% probability', () => {
      const field = fieldGenerator(2, 0.5);
      const flatField = field.flat();

      const cellsWithBombs = flatField.filter(cellWithBombFilter);
      const emptyCells = flatField.filter((cell) => cell === empty);

      expect(cellsWithBombs).toHaveLength(2);
      expect(cellsWithBombs).toHaveLength(2);
    });

    it('Real game field size = 10x10 with 1/4 mined cells (~25 mines', () => {
      const size = 10,
        mines = 25;
      const probability = mines / (size * size),
        field = fieldGenerator(size, probability);

      table(field);

      const flatField = field.flat();
      expect(flatField.filter(cellWithBombFilter)).toHaveLength(25);
    });
  });
});
