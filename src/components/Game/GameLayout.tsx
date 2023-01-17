import { FC, ReactNode } from 'react';
import { GameArea } from './GameArea';
import { Wrapper } from './Wrapper';

export interface Props {
  top: ReactNode;
  children: ReactNode;
}

export const GameLayout: FC<Props> = ({ top, children }) => (
  <Wrapper>
    {top}
    <GameArea>{children}</GameArea>
  </Wrapper>
);
