import styled from '@emotion/styled';
import { FC } from 'react';
import { Counter } from './Counter';
import { Level } from './Level';
import { Reset } from './Reset';

const Wrapper = styled.div`
  display: flex;
  width: max-content;
  padding-bottom: 2vw;
  justify-content: space-between;
`;

export interface ScoreboardProps {
  /**
   * Timer
   */
  time: string;
  /**
   * Possible game scenarios
   */
  levels: string[];
  /**
   * Action handler when the GameReset button is clicked
   */
  onReset: () => void;
  /**
   * Bombs in the field
   */
  mines: string;
}

export const Scoreboard: FC<ScoreboardProps> = ({
  time,
  levels,
  mines,
  onReset,
}) => (
  <Wrapper>
    <Counter>{time}</Counter>
    <Level>{levels}</Level>
    <Reset onReset={onReset} />
    <Counter>{mines}</Counter>
  </Wrapper>
);
