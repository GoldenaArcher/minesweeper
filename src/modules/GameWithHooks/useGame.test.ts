import { renderHook, act } from '@testing-library/react-hooks';
import { useGame } from './useGame';
import { GameLevels, GameSettings } from '../GameSettings';
import { Field } from '../../core/Field';
import { CellState } from '../../core/Field';

jest.mock('../../core/Field');

const [easy, medium, hard] = GameLevels;
const { empty: e, hidden: h, bomb: b, flag: f } = CellState;

const flatWithFilter = (field: Field, cond: string) =>
  field.flat().filter((v) => v === cond);

describe('useGame test cases', () => {
  describe('Render behaviour', () => {
    it('Render hook by default', () => {
      const { result } = renderHook(useGame);
      const { level, isGameOver, isWin, settings, playerField, gameField } =
        result.current;

      expect({ level, isGameOver, isWin, settings }).toStrictEqual({
        level: easy,
        isGameOver: false,
        isWin: false,
        settings: GameSettings.easy,
      });
      expect(playerField).toHaveLength(9);
      expect(flatWithFilter(gameField, b)).toHaveLength(10);
    });
    it('onChange game level handler', () => {
      const { result } = renderHook(useGame);
      const { playerField: beginnerPlayerField, onChangeLevel } =
        result.current;

      expect(beginnerPlayerField).toHaveLength(9);

      act(() => onChangeLevel(medium));

      const { playerField: intermediatePlayerField } = result.current;

      expect(intermediatePlayerField).toHaveLength(16);

      act(() => onChangeLevel(hard));

      const { playerField: expertPlayerField } = result.current;

      expect(expertPlayerField).toHaveLength(22);
    });
  });
  describe('Open cell test cases', () => {
    it('Open empty cell on the beginner level', () => {
      const { result } = renderHook(useGame);

      const { playerField, onClick } = result.current;

      expect(playerField).toHaveLength(9);
      expect(flatWithFilter(playerField, e)).toHaveLength(0);

      act(() => onClick([0, 0]));

      const { playerField: newPlayerField } = result.current;

      expect(flatWithFilter(newPlayerField, e)).toHaveLength(18);
    });
    it('context menu handler', () => {
      const { result } = renderHook(useGame);
      const { onContextMenu } = result.current;

      act(() => onContextMenu([0, 0]));
      const { playerField: newPlayerField } = result.current;
      expect(flatWithFilter(newPlayerField, f)).toHaveLength(1);
    });
    it('Click to the non-empty cells area', () => {
      const { result } = renderHook(useGame);

      const { playerField, onClick } = result.current;

      expect(flatWithFilter(playerField, '1')).toHaveLength(0);

      act(() => onClick([0, 8]));

      const { playerField: newPlayerField } = result.current;

      expect(flatWithFilter(newPlayerField, '1')).toHaveLength(1);
    });
  });
  describe('OnClick with OnChangeGameLevel and OnReset', () => {
    it('Check click to the cell when the level is changed', () => {
      const { result } = renderHook(useGame);
      const { playerField, onChangeLevel } = result.current;

      expect(playerField).toHaveLength(9);

      act(() => onChangeLevel(medium));

      const {
        playerField: intermediatePlayerField,
        onClick: onClickIntermediate,
      } = result.current;

      act(() => onClickIntermediate([15, 15]));

      expect(intermediatePlayerField).toHaveLength(16);
      expect(flatWithFilter(intermediatePlayerField, e)).toHaveLength(2);

      act(() => onChangeLevel(hard));

      const { playerField: expertPlayerField, onClick: onClickExpert } =
        result.current;

      act(() => onClickExpert([21, 21]));

      expect(expertPlayerField).toHaveLength(22);
      expect(flatWithFilter(expertPlayerField, e)).toHaveLength(1);
      expect(flatWithFilter(expertPlayerField, '1')).toHaveLength(2);
      expect(flatWithFilter(expertPlayerField, '2')).toHaveLength(1);
    });
    it('onReset game handler', () => {
      const { result } = renderHook(useGame);
      const { playerField, onClick, onReset, onContextMenu } = result.current;

      expect(playerField).toHaveLength(9);

      act(() => onClick([0, 8]));
      act(() => onContextMenu([8, 8]));

      expect(flatWithFilter(playerField, '1')).toHaveLength(1);

      act(() => onClick([0, 0]));
      const { playerField: newPlayerField } = result.current;

      expect(flatWithFilter(newPlayerField, e)).toHaveLength(18);

      act(onReset);
      const {
        playerField: finalPlayerField,
        isWin,
        isGameOver,
        gameField,
        isGameStarted,
        flagCounter,
      } = result.current;

      expect(isWin).toBe(false);
      expect(isGameStarted).toBe(false);
      expect(flagCounter).toBe(0);
      expect(isGameOver).toBe(false);
      expect(flatWithFilter(finalPlayerField, h)).toHaveLength(81);
      expect(flatWithFilter(gameField, b)).toHaveLength(10);
    });
  });
  describe('Game over behavior', () => {
    it('Player loose the game', () => {
      jest.useFakeTimers();
      const { result } = renderHook(useGame);

      const { playerField, onClick } = result.current;

      act(() => onClick([0, 8]));

      expect(flatWithFilter(playerField, '1')).toHaveLength(1);

      const timeMustPass = 5;

      for (let i = 0; i < timeMustPass; i++) {
        act(() => {
          jest.advanceTimersByTime(1000);
        });
      }

      expect(result.current.time).toBe(5);

      act(() => onClick([0, 0]));

      expect(flatWithFilter(playerField, e)).toHaveLength(18);

      act(() => onClick([0, 7]));

      const {
        isWin,
        isGameOver,
        playerField: newPlayerField,
        onReset,
      } = result.current;

      expect(isGameOver).toBe(true);
      expect(isWin).toBe(false);
      expect(flatWithFilter(newPlayerField, h)).toHaveLength(0);
      expect(flatWithFilter(newPlayerField, e)).toHaveLength(27);
      expect(flatWithFilter(newPlayerField, '1')).toHaveLength(30);
      expect(flatWithFilter(newPlayerField, '2')).toHaveLength(12);
      expect(flatWithFilter(newPlayerField, '3')).toHaveLength(2);

      act(onReset);
      const { playerField: latestPlayerField } = result.current;

      expect(flatWithFilter(latestPlayerField, h)).toHaveLength(81);
    });
    it('Player win the game', () => {
      const { result } = renderHook(useGame);

      const { gameField, onClick, onContextMenu } = result.current;

      for (const y of gameField.keys()) {
        for (const x of gameField[y].keys()) {
          const gameCell = gameField[y][x];
          act(() => {
            gameCell !== b ? onClick([y, x]) : onContextMenu([y, x]);
          });
        }
      }

      const { isGameOver, isWin } = result.current;

      expect(isWin).toBe(true);
      expect(isGameOver).toBe(true);
    });
  });
  describe('Scoreboard behavior - timer and bomb counter', () => {
    it('Timer should start by click to a cell', () => {
      jest.useFakeTimers();

      const { result } = renderHook(useGame);

      const timeMustPass = 5;

      for (let i = 0; i < timeMustPass; i++) {
        act(() => {
          jest.advanceTimersByTime(1000);
        });
      }

      // Timer shouldn't works before game has started
      expect(result.current.time).toBe(0);

      act(() => result.current.onClick([0, 0]));

      for (let i = 0; i < timeMustPass; i++) {
        act(() => {
          jest.advanceTimersByTime(1000);
        });
      }

      expect(result.current.time).toBe(5);
    });
    it('Timer should start by mark a cell by a flag', () => {
      jest.useFakeTimers();

      const { result } = renderHook(useGame);

      const timeMustPass = 5;

      for (let i = 0; i < timeMustPass; i++) {
        act(() => {
          jest.advanceTimersByTime(1000);
        });
      }

      // Timer shouldn't works before game has started
      expect(result.current.time).toBe(0);

      act(() => result.current.onContextMenu([0, 0]));

      for (let i = 0; i < timeMustPass; i++) {
        act(() => {
          jest.advanceTimersByTime(1000);
        });
      }

      expect(result.current.time).toBe(timeMustPass);
    });
    it('Time should reset value when onReset have been called', () => {
      jest.useFakeTimers();

      const { result } = renderHook(useGame);

      expect(result.current.time).toBe(0);

      act(() => result.current.onContextMenu([0, 0]));

      const timeMustPass = 5;
      for (let i = 0; i < timeMustPass; i++) {
        act(() => {
          jest.advanceTimersByTime(1000);
        });
      }

      expect(result.current.time).toBe(timeMustPass);

      act(result.current.onReset);

      expect(result.current.time).toBe(0);
    });
    it('flagCounter counter increase when onContextMenu calls', () => {
      const { result } = renderHook(useGame);

      act(() => result.current.onContextMenu([0, 0]));

      expect(result.current.flagCounter).toBe(1);
    });
    it('flagCounter counter should stop when flagCounter > bombs', () => {
      const { result } = renderHook(useGame);

      expect(result.current.time).toBe(0);

      for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 4; x++) {
          act(() => result.current.onContextMenu([y, x]));
        }
      }

      expect(result.current.flagCounter).toBe(10);
    });
  });
});
