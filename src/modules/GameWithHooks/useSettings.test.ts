import { renderHook, act } from '@testing-library/react-hooks';
import { useSettings } from './useSettings';
import { GameSettings } from '../GameSettings';

describe('useGameSettings test cases', () => {
  it('Check default settings', () => {
    const { result } = renderHook(useSettings);

    expect(result.current.settings).toEqual(GameSettings.easy);
    expect(result.current.level).toBe('easy');
  });
  it('Check setLevel to medium', () => {
    const { result } = renderHook(useSettings);

    act(() => {
      const newSettings = result.current.setLevel('medium');
      expect(newSettings).toEqual(GameSettings.medium);
    });

    expect(result.current.settings).toEqual(GameSettings.medium);
    expect(result.current.level).toBe('medium');
  });
});
