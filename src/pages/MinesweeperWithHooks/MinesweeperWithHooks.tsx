import { FC } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { GameLayout } from '../../components/Game/GameLayout';
import { Top } from '../../components/Top/Top';
import { GameWithHooks } from '../../modules/GameWithHooks';

export const MinesweeperWithHooks: FC = () => {
  const { username } = useParams<{ username?: string }>();

  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  return (
    <GameLayout
      top={
        <Top
          name="Minesweeper with ReactHooks"
          feature="Flag"
          firstAction="right"
          secondAction="click"
        >
          {username && `${username}`}
          {id && `; userId:${id}`}
        </Top>
      }
    >
      <GameWithHooks />
    </GameLayout>
  );
};
