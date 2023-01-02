import './App.css';
import { Top } from './components/Top/Top';
import { Scoreboard } from './components/Scoreboard/Scoreboard';

function App() {
  return (
    <>
      <Top
        feature="flag"
        firstAction="ctrl"
        secondAction="click"
        name="Minesweeper"
      />
      <Scoreboard
        time="000"
        levels={['easy', 'medium', 'hard']}
        mines="010"
        onReset={() => null}
      />
    </>
  );
}

export default App;
