import styled from '@emotion/styled';
import { FC, memo } from 'react';
import { GameName, GameNameProps } from './GameName';
import Legend from './Legend';
import { LegendProps } from './Legend';

const Header = styled.header`
  text-align: center;
  position: relative;
  display: inline-block;
`;

export type TopComponentType = LegendProps & GameNameProps;

export const Top: FC<TopComponentType> = memo(
  ({ name, children, ...legendProps }) => (
    <Header>
      <GameName name={name}>{children}</GameName>
      <Legend {...legendProps} />
    </Header>
  )
);

Top.displayName = 'Top';
