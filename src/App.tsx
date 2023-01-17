import { FC, Suspense, lazy } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Link,
  Routes,
  Route,
  useSearchParams,
} from 'react-router-dom';

const MinesweeperWithHooks = lazy(() =>
  import('./pages/MinesweeperWithHooks').then(({ MinesweeperWithHooks }) => ({
    default: MinesweeperWithHooks,
  }))
);

const MinesweeperWithReducer = lazy(() =>
  import('./pages/MinesweeperWithReducer').then(
    ({ MinesweeperWithReducer }) => ({
      default: MinesweeperWithReducer,
    })
  )
);

const MinesweeperWithRedux = lazy(() =>
  import('./pages/MinesweeperWithRedux').then(({ MinesweeperWithRedux }) => ({
    default: MinesweeperWithRedux,
  }))
);

export const Navigation: FC = () => {
  const [searchParams] = useSearchParams();
  const level = searchParams.get('level');

  const getLocationObjWithSearchParams = (
    pathname: string
  ): Partial<Location> => ({
    pathname,
    search: `${level && level.toString()}`,
  });

  return (
    <nav>
      <ul>
        <li>
          <Link to={getLocationObjWithSearchParams('/')}>Home</Link>
        </li>
        <li>
          <Link to={getLocationObjWithSearchParams('/minesweeper/hooks')}>
            GameWithHooks
          </Link>
        </li>
        <li>
          <Link to={getLocationObjWithSearchParams('/minesweeper/useReducer')}>
            GameWithReducer
          </Link>
        </li>
        <li>
          <Link to={getLocationObjWithSearchParams('/minesweeper/redux')}>
            GameWithRedux
          </Link>
        </li>
      </ul>
    </nav>
  );
};

const Home: FC = () => <h1>Minesweeper game home page</h1>;

const App: FC = () => (
  <Router>
    <Navigation />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/minesweeper">
        <Route
          path="hooks"
          element={
            <Suspense fallback={<div>Loading minesweeper with hooks...</div>}>
              <MinesweeperWithHooks />
            </Suspense>
          }
        >
          <Route
            path=":username"
            element={
              <Suspense fallback={<div>Loading minesweeper with hooks...</div>}>
                <MinesweeperWithHooks />
              </Suspense>
            }
          />
        </Route>
        <Route
          path="redux"
          element={
            <Suspense fallback={<div>Loading minesweeper with Redux...</div>}>
              <MinesweeperWithRedux />
            </Suspense>
          }
        />
        <Route
          path="useReducer"
          element={
            <Suspense
              fallback={<div>Loading minesweeper with useReducer...</div>}
            >
              <MinesweeperWithReducer />
            </Suspense>
          }
        />
      </Route>
      <Route path="*" element={<h1>404, page not found</h1>} />
    </Routes>
  </Router>
);

export default App;
