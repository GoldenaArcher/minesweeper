import { render } from '@testing-library/react';
import { GameName } from './GameName';

it('GameName renders correctly', () => {
  const { asFragment } = render(<GameName name="MineSweeper" />);
  expect(asFragment()).toMatchSnapshot();
});
