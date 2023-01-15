import { renderHook } from '@testing-library/react';
import { useMouseDown } from './useMouseDown';
import { act } from 'react-dom/test-utils';

describe('useMouseDown hook test', () => {
  it('Should toggle state after onMouseDown/onMouseUp calls', () => {
    const { result } = renderHook(useMouseDown);

    const [mouseDown, onMouseDown, onMouseUp] = result.current;

    expect(mouseDown).toBe(false);

    act(onMouseDown);
    expect(result.current[0]).toBe(true);

    act(onMouseUp);
    expect(result.current[0]).toBe(false);

    act(onMouseDown);
    expect(result.current[0]).toBe(true);
  });
});
