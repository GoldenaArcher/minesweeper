/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable jest/no-conditional-expect */
import { createEvent, fireEvent, render, screen } from '@testing-library/react';
import { Coords, cells, CellState as CellType } from '../../core/Field';
import Cell, { areEqual } from './Cell';
import { checkIsActiveCell } from './Cell';

describe('Cell component check', () => {
  const coords: Coords = [1, 1];
  const props = {
    coords,
    flagCounter: 0,
    bombs: 10,
    onClick: jest.fn(),
    onContextMenu: jest.fn(),
  };

  cells.forEach((cell) => {
    it('Check prevent default contextMenu for every type of cell', () => {
      const props = {
        coords,
        onClick: jest.fn(),
        onContextMenu: jest.fn(),
      };

      render(<Cell {...props}>{cell}</Cell>);

      const cellComp = screen.getByTestId(`${coords}`);
      const contextMenuEvent = createEvent.contextMenu(cellComp);
      fireEvent(cellComp, contextMenuEvent);
      expect(contextMenuEvent.defaultPrevented).toBe(true);

      contextMenuEvent.stopPropagation;
      contextMenuEvent.bubbles;

      /**
       * alternative which is somewhat confusing for me:
       *
       * const isPrevented = fireEvent.contextMenu(cellComp);
       * expect(isPrevented).toBe(false);
       *
       * both solution can be accredited to:
       * https://stackoverflow.com/questions/60455119/react-jest-test-preventdefault-action
       */
    });

    it('onClick and onContextMenu handler should be called for active cells', () => {
      const props = {
        coords,
        onClick: jest.fn(),
        onContextMenu: jest.fn(),
      };

      render(<Cell {...props}>{cell}</Cell>);
      const cellComp = screen.getByTestId(`${coords}`);
      fireEvent.click(cellComp);
      fireEvent.contextMenu(cellComp);

      if (checkIsActiveCell(cell)) {
        expect(props.onClick).toBeCalled();
        expect(props.onContextMenu).toBeCalled();
      } else {
        expect(props.onClick).not.toBeCalled();
        expect(props.onContextMenu).not.toBeCalled();
      }
    });

    it('Check areEqual', () => {
      const prevProps = {
        ...props,
        children: '0' as CellType,
      };

      expect(areEqual(prevProps, { ...prevProps })).toBe(true);

      expect(areEqual(prevProps, { ...prevProps, coords: [2, 1] })).toBe(false);
      expect(areEqual(prevProps, { ...prevProps, coords: [1, 2] })).toBe(false);
      expect(areEqual(prevProps, { ...prevProps, coords: [2, 2] })).toBe(false);
      expect(areEqual(prevProps, { ...prevProps, coords: [1, 0] })).toBe(false);

      expect(
        areEqual(prevProps, { ...prevProps, children: '1' as CellType })
      ).toBe(false);
      expect(areEqual(prevProps, { ...prevProps, onClick: jest.fn() })).toBe(
        false
      );
      expect(
        areEqual(prevProps, { ...prevProps, onContextMenu: jest.fn() })
      ).toBe(false);
    });
  });
});
