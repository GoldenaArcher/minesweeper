import styled from '@emotion/styled';
import { Cell as CellType, CellState, Coords } from '../../core/Field';
import { FC, memo } from 'react';
import { useMouseDown } from '../hooks/useMouseDown';

const transparent = 'rgba(0, 0, 0, 0)';

const colors: { [key in CellType]: string } = {
  '0': transparent,
  '1': '#2a48ec',
  '2': '#2bb13d',
  '3': '#ec6561',
  '4': '#233db7',
  '5': '#a6070f',
  '6': '#e400af',
  '7': '#906a02',
  '8': '#fa0707',
  '9': transparent,
  '10': transparent,
  '11': transparent,
  '12': transparent,
};

interface ClosedFrameProps {
  mousedown?: boolean;
}

const ClosedFrame = styled.div<ClosedFrameProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  cursor: pointer;
  width: 1.8vw;
  height: 1.8vw;
  background-color: #d1d1d1;
  border: 0.6vh solid transparent;
  color: ${({ children }) => colors[children as CellType] ?? transparent};
  border-color: ${({ mousedown = false }) =>
    mousedown ? 'transparent' : 'white #9e9e9e #9e9e9e white'};
  &:hover {
    filter: brightness(1.1);
  }
`;

const RevealedFrame = styled(ClosedFrame)`
  border-color: #ddd;
  cursor: default;
  color: ${({ children }) => colors[children as CellType] ?? transparent};
  &:hover {
    filter: brightness(1);
  }
`;

const Bomb = styled.div`
  border-radius: 50%;
  width: 1vw;
  height: 1vw;
  background-color: #333;
`;

const BombFrame = styled(RevealedFrame)`
  background-color: #ec433c;
`;

const Flag = styled.div`
  width: 0px;
  height: 0px;
  border-top: 0.5vw solid transparent;
  border-bottom: 0.5vw solid transparent;
  border-left: 0.5vw solid #ec433c;
`;

const WeakFlag = styled(Flag)`
  border-left: 0.5vw solid #f19996;
`;

export interface CellProps {
  children: CellType;
  coords: Coords;
  onClick: (coords: Coords) => void;
  onContextMenu: (coords: Coords) => void;
}

interface ComponentsMapProps {
  children: CellType;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  onContextMenu: (e: React.MouseEvent<HTMLElement>) => void;
  'data-testid'?: string;
  onMouseDown: () => void;
  onMouseUp: () => void;
  onMouseLeave: () => void;
  mousedown: boolean;
}

const ComponentsMap: FC<ComponentsMapProps> = ({ children, ...rest }) => {
  const nonActiveCellProps = {
    onContextMenu: rest.onContextMenu,
    'data-testid': rest['data-testid'],
    role: 'cell',
  };

  switch (children) {
    case CellState.empty:
      return <RevealedFrame {...nonActiveCellProps}>{children}</RevealedFrame>;
    case CellState.hidden:
      return <ClosedFrame {...rest}>{children}</ClosedFrame>;
    case CellState.bomb:
      return (
        <BombFrame {...nonActiveCellProps}>
          <Bomb />
        </BombFrame>
      );
    case CellState.flag:
      return (
        <ClosedFrame {...rest}>
          <Flag />
        </ClosedFrame>
      );
    case CellState.weakFlag:
      return (
        <ClosedFrame {...rest}>
          <WeakFlag />
        </ClosedFrame>
      );
    default:
      return <RevealedFrame {...nonActiveCellProps}>{children}</RevealedFrame>;
  }
};

export const checkIsActiveCell = (cell: CellType): boolean =>
  [CellState.hidden, CellState.flag, CellState.weakFlag].includes(
    cell as CellState
  );

export const areEqual = (
  prevProps: CellProps,
  nextProps: CellProps
): boolean => {
  const areEqualCoords =
    prevProps.coords.filter((coord, idx) => nextProps.coords[idx] !== coord)
      .length === 0;

  return (
    prevProps.children === nextProps.children &&
    areEqualCoords &&
    prevProps.onClick === nextProps.onClick &&
    prevProps.onContextMenu === nextProps.onContextMenu
  );
};

const Cell: FC<CellProps> = memo(({ children, coords, ...rest }) => {
  const [mousedown, onMouseDown, onMouseUp] = useMouseDown();
  const onClick = () => rest.onClick(coords);

  const onContextMenu = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (checkIsActiveCell(children)) {
      rest.onContextMenu(coords);
    }
  };

  const props = {
    onClick,
    onContextMenu,
    'data-testid': `${coords}`,
    onMouseDown,
    onMouseUp,
    onMouseLeave: onMouseUp,
    mousedown,
    role: 'cell',
  };

  return <ComponentsMap {...props}>{children}</ComponentsMap>;
}, areEqual);

Cell.displayName = 'Cell';

export default Cell;
