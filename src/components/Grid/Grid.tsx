import { Field, Coords } from '../../helpers/Field';
import { FC } from 'react';
import Cell from './Cell';
import styled from '@emotion/styled';

interface WrapperProps {
  size: number;
}

const Wrapper = styled.div<WrapperProps>`
  display: grid;
  grid-template-columns: repeat(${({ size }) => size}, auto);
  width: max-content;
  padding: 1vw;
`;

export interface GridProps {
  children: Field;
  onClick: (coords: Coords) => void;
  onContextMenu: (coords: Coords) => void;
}

export const Grid: FC<GridProps> = ({ children, ...rest }) => (
  <Wrapper size={children.length}>
    {children.map((row, y) =>
      row.map((cell, x) => (
        <Cell key={`${y}_${x}_${cell}`} coords={[y, x]} {...rest}>
          {cell}
        </Cell>
      ))
    )}
  </Wrapper>
);
