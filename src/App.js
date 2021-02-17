import { useDispatch } from 'react-redux';
import { resetGame } from './store/actions';

import './App.css';
import CONFIG from './data/config';
import AvailableCards from './components/AvailableCards';
import Players from './components/Players';
import InPlay from './components/InPlay';
import PlayedCards from './components/PlayedCards';
import DeckSvgInline from './components/DeckSvgInline';

function App() {

  const dispatch = useDispatch();

  const reset = () => {
    dispatch(resetGame());
  }

  return (
    <main className="app" style={{ '--card-width': CONFIG.CARD_WIDTH, '--card-height': CONFIG.CARD_HEIGHT }}>
      <div>
        <button onClick={reset}>Reset game</button>
      </div>
      <AvailableCards />
      <Players />
      <InPlay />
      <PlayedCards />
      <DeckSvgInline />
    </main>
  );
}

export default App;
