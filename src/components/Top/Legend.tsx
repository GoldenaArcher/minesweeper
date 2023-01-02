import React, { FC } from 'react';
import styled from '@emotion/styled';

export interface LegendProps {
  feature: string;
  firstAction: string;
  secondAction: string;
}

export const Parent = styled.legend`
  font-size: 1em;
  margin: 0 auto 2vw;
  line-height: 1.25em;
`;

const FlagComboParent = styled.code`
  background: #e3e3e3;
`;

const Feature = styled.span`
  font-weight: 700;
  display: inline-block;
  margin-right: 0.5vw;
  &:first-letter {
    text-transform: capitalize;
  }
`;

const FirstAction = styled.span`
  color: #ec433c;
`;

const SecondAction = styled.span`
  color: #2a48ec;
`;

const Legend: FC<LegendProps> = ({ feature, firstAction, secondAction }) => {
  return (
    <Parent>
      <Feature>{feature}</Feature>
      <FlagComboParent>
        <FirstAction>{firstAction}</FirstAction> +{' '}
        <SecondAction>{secondAction}</SecondAction>
      </FlagComboParent>
    </Parent>
  );
};

export default Legend;
