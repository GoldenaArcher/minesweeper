import {
  incrementNeighbors,
  getNeighborsItems,
  checkItemInField,
} from './CellsManipulator';
import { CellState, Field } from './Field';

const { empty: e, hidden: h, bomb: b } = CellState;

describe('checkItemInField tests', () => {
  describe('Simple cases', () => {
    const field: Field = [[e]];
    it('Out of y range', () => {
      expect(checkItemInField([1, 0], field)).toBe(false);
    });

    it('Out of y range with negative number', () => {
      expect(checkItemInField([-1, 0], field)).toBe(false);
    });

    it('Out of x range', () => {
      expect(checkItemInField([0, -1], field)).toBe(false);
    });

    it('In x and y range', () => {
      expect(checkItemInField([0, 0], field)).toBe(true);
    });
  });
});

describe('Check Increment Neighbors', () => {
  describe('Simple cases', () => {
    it('Field with only 1 item', () => {
      expect(incrementNeighbors([0, 0], [[b]])).toStrictEqual([[b]]);
    });

    it('Field 2x2 with one mine', () => {
      expect(
        incrementNeighbors(
          [0, 0],
          [
            [b, e],
            [e, e],
          ]
        )
      ).toStrictEqual([
        [b, '1'],
        ['1', '1'],
      ]);
    });

    it('Field 2x2 with two mine', () => {
      expect(
        incrementNeighbors(
          [0, 0],
          [
            [b, e],
            [e, b],
          ]
        )
      ).toStrictEqual([
        [b, '1'],
        ['1', b],
      ]);
    });

    it('Field 3x3 with two mine', () => {
      expect(
        incrementNeighbors(
          [1, 1],
          [
            [e, e, e],
            [e, b, e],
            [e, e, e],
          ]
        )
      ).toStrictEqual([
        ['1', '1', '1'],
        ['1', b, '1'],
        ['1', '1', '1'],
      ]);
    });
  });

  describe('Check neighbours selectors', () => {
    it('With [0, 0] coords', () => {
      expect(getNeighborsItems([0, 0])).toStrictEqual({
        top: [-1, 0],
        topRight: [-1, 1],
        right: [0, 1],
        rightBottom: [1, 1],
        bottom: [1, 0],
        bottomLeft: [1, -1],
        left: [0, -1],
        leftTop: [-1, -1],
      });
    });

    it('With [3, 3] corrds', () => {
      expect(getNeighborsItems([3, 3])).toStrictEqual({
        top: [2, 3],
        topRight: [2, 4],
        right: [3, 4],
        rightBottom: [4, 4],
        bottom: [4, 3],
        bottomLeft: [4, 2],
        left: [3, 2],
        leftTop: [2, 2],
      });
    });
  });
});