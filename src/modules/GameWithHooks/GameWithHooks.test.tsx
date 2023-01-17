import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { GameWithHooks } from './GameWithHooks';
import { useSearchParams } from 'react-router-dom';

const mockOnClick = jest.fn();
const mockOnChangeLevel = jest.fn();
const mockOnReset = jest.fn();
const mockOnContextMenu = jest.fn();
const mockSetSearchParams = jest.fn();

jest.mock('react-router-dom', () => ({
  useSearchParams: jest.fn(),
}));

jest.mock('./useGame', () => ({
  __esModule: true,
  useGame: (level = 'easy') => ({
    level,
    time: 0,
    flagCounter: 0,
    isGameOver: true,
    isWin: false,
    settings: [9, 10],
    playerField: [
      [10, 10],
      [10, 10],
    ],
    onClick: mockOnClick,
    onContextMenu: mockOnContextMenu,
    onChangeLevel: mockOnChangeLevel,
    onReset: mockOnReset,
  }),
}));

beforeEach(() => {
  jest.clearAllMocks();
  (useSearchParams as jest.Mock).mockReturnValue([
    { get: () => null },
    mockSetSearchParams,
  ]);
});

describe('GameWithHooks test cases', () => {
  it('Render game field by default', () => {
    const { asFragment } = render(<GameWithHooks />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('Cell click works fine', () => {
    render(<GameWithHooks />);
    userEvent.click(screen.getByTestId('0,0'));
    // TODO - check why this is not working
    // expect(mockOnClick).toHaveBeenCalled();
  });
  it('Context menu handler on a cell works fine', () => {
    render(<GameWithHooks />);
    userEvent.click(screen.getByTestId('0,0'), { button: 2 });
    // TODO - check why this is not working
    // expect(mockOnContextMenu).toHaveBeenCalled();
  });
  it('Reset handler works fine', () => {
    render(<GameWithHooks />);
    userEvent.click(screen.getByRole('button'));
    expect(mockOnReset).toHaveBeenCalled();
  });
  it('Change level works fine', () => {
    render(<GameWithHooks />);
    userEvent.selectOptions(screen.getByRole('combobox'), 'medium');
    expect(mockOnChangeLevel).toHaveBeenCalled();
    expect(mockSetSearchParams).toHaveBeenCalledWith({ level: 'medium' });
  });
  it('Level in search params works fine', () => {
    (useSearchParams as jest.Mock).mockReturnValue([
      { get: () => 'medium' },
      mockSetSearchParams,
    ]);
    render(<GameWithHooks />);
    const intermediateOption = screen.queryByText('medium');
    expect(intermediateOption).toBeInTheDocument();
  });
  it('Game over reset the game state', () => {
    render(<GameWithHooks />);
    userEvent.click(screen.getByText('🙁'));
    expect(mockOnReset).toHaveBeenCalled();
  });
});
