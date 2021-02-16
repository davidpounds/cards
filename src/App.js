import { useDispatch, useSelector } from 'react-redux';
import { getPlayers } from './store/selectors';
import { shuffleDeck, resetGame, addPlayer } from './store/actions';

import './App.css';
import CONFIG from './data/config';
import AvailableCards from './components/AvailableCards';
import Players from './components/Players';
import InPlay from './components/InPlay';
import PlayedCards from './components/PlayedCards';
import DeckSvgInline from './components/DeckSvgInline';

function App() {

  const dispatch = useDispatch();

  const players = useSelector(getPlayers);

  const shuffleDeckHandler = () => {
    dispatch(shuffleDeck());
  };

  const addPlayerHandler = () => {
    const playerCount = players.length;
    if (playerCount >= CONFIG.MAX_PLAYERS) {
      return;
    }
    const playerNo = playerCount + 1;
    const newPlayer = `Player ${playerNo}`;
    dispatch(addPlayer(newPlayer));
  };

  const reset = () => {
    dispatch(resetGame());
  }

  return (
    <main className="app" style={{ '--card-width': CONFIG.CARD_WIDTH, '--card-height': CONFIG.CARD_HEIGHT }}>
      <AvailableCards />
      <div>
        <button onClick={shuffleDeckHandler}>Shuffle</button>
        <button onClick={addPlayerHandler} disabled={players.length >= CONFIG.MAX_PLAYERS}>Add player</button>
        <button onClick={reset}>Reset</button>
      </div>
      <Players players={players} />
      <InPlay />
      <PlayedCards />
      <DeckSvgInline />
    </main>
  );
}

export default App;
