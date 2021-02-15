import { useDispatch, useSelector } from 'react-redux';
import { getAvailableCards, getPlayedCards } from './store/selectors/deck';
import { getPlayers } from './store/selectors/players';
import { shuffleDeck, dealHand, resetDeck } from './store/actions/deck';
import { addPlayer, resetPlayers } from './store/actions/players';

import './App.css';
import CONFIG from './data/config';
import Card from './components/Card';
import Players from './components/Players';
import InPlay from './components/InPlay';
import DeckSvgInline from './components/DeckSvgInline';

function App() {

  const dispatch = useDispatch();

  const unassigned = useSelector(getAvailableCards);
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
    const newPlayer = Symbol(`Player ${playerNo}`);
    dispatch(addPlayer(newPlayer));
    dispatch(dealHand(newPlayer, CONFIG.CARDS_TO_DEAL, unassigned));
  };

  const reset = () => {
    dispatch(resetDeck());
    dispatch(resetPlayers());
  }

  return (
    <main className="app" style={{ '--card-width': CONFIG.CARD_WIDTH, '--card-height': CONFIG.CARD_HEIGHT }}>
      <div className="cardlist deck">
        {unassigned.map(card => <Card key={`${card.suit}${card.value}`} {...card} />)}
      </div>
      <div>
        <button onClick={shuffleDeckHandler}>Shuffle</button>
        <button onClick={addPlayerHandler} disabled={players.length >= CONFIG.MAX_PLAYERS}>Add player</button>
        <button onClick={reset}>Reset</button>
      </div>
      <Players players={players} />
      <InPlay />
      <DeckSvgInline />
    </main>
  );
}

export default App;
