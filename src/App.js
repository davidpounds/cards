import { useDispatch } from 'react-redux';
import { shuffleDeck, resetGame } from './store/actions';

import './App.css';
import CONFIG from './data/config';
import AvailableCards from './components/AvailableCards';
import Players from './components/Players';
import InPlay from './components/InPlay';
import PlayedCards from './components/PlayedCards';
import DeckSvgInline from './components/DeckSvgInline';

function App() {

  const dispatch = useDispatch();

  const shuffleDeckHandler = () => {
    dispatch(shuffleDeck());
  };

  const reset = () => {
    dispatch(resetGame());
  }

  return (
    <main className="app" style={{ '--card-width': CONFIG.CARD_WIDTH, '--card-height': CONFIG.CARD_HEIGHT }}>
      <AvailableCards />
      <div>
        <button onClick={shuffleDeckHandler}>Shuffle</button>
        <button onClick={reset}>Reset</button>
      </div>
      <Players />
      <InPlay />
      <PlayedCards />
      <DeckSvgInline />
    </main>
  );
}

export default App;
