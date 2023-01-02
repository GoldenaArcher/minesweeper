import styled from '@emotion/styled';
import { FC } from 'react';

export interface GameNameProps {
  name: string;
}

const GameNameHeader = styled.h1`
  font-size: 2em;
`;

export const GameName: FC<GameNameProps> = ({ name }) => {
  return <GameNameHeader>{name}</GameNameHeader>;
};
