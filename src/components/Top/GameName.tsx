import styled from '@emotion/styled';
import { FC, ReactNode } from 'react';

export interface GameNameProps {
  name: string;
  children?: ReactNode;
}

const GameNameHeader = styled.h1`
  font-size: 2em;
`;

export const GameName: FC<GameNameProps> = ({ name, children }) => {
  return (
    <GameNameHeader>
      {name}
      , {children}
    </GameNameHeader>
  );
};
