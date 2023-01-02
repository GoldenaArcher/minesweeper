import { createEvent, fireEvent, render, screen } from '@testing-library/react';
import { Coords, cells } from '../../helpers/Field';
import Cell from './Cell';
import { checkIsActiveCell } from './Cell';

describe('Cell component check', () => {
  const coords: Coords = [1, 1];
  cells.forEach((cell) => {
    it('Check prevent default contextMenu for every type of cell', () => {
      const props = {
        coords,
        onClick: jest.fn(),
        onContextMenu: jest.fn(),
      };

      render(<Cell {...props}>{cell}</Cell>);

      const cellComp = screen.getByTestId(`${cell}_${coords}`);
      const contextMenuEvent = createEvent.contextMenu(cellComp);
      fireEvent(cellComp, contextMenuEvent);
      expect(contextMenuEvent.defaultPrevented).toBe(true);

      contextMenuEvent.stopPropagation
      contextMenuEvent.bubbles

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
      const cellComp = screen.getByTestId(`${cell}_${coords}`);
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
  });
});
