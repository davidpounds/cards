import { useState } from 'react';
import './App.css';
import DECK from './data/deck';
import CONFIG from './data/config';
import { dealHand, shuffle } from './utils/cardorder';
import Card from './components/Card';
import Hand from './components/Hand';
import DeckSvgInline from './components/DeckSvgInline';

function App() {

  const [deck, setDeck] = useState(DECK);
  const [players, setPlayers] = useState([]);

  const shuffleDeck = () => {
    setDeck(shuffle(deck));
  };

  const addPlayer = () => {
    const playerCount = players.length;
    if (playerCount >= CONFIG.MAX_PLAYERS) {
      return;
    }
    const playerNo = playerCount + 1;
    const { hand, newDeck } = dealHand(deck, CONFIG.CARDS_TO_DEAL);
    setDeck(newDeck);
    const newPlayer = {
      playerNo,
      hand,
    };
    setPlayers([...players, newPlayer]);
  };

  const reset = () => {
    setDeck(DECK);
    setPlayers([]);
  };

  return (
    <>
      <div className="app cardlist">
        {deck.map(card => <Card {...card} />)}
        <DeckSvgInline />
      </div>
      <div>
        <button onClick={shuffleDeck}>Shuffle</button>
        <button onClick={addPlayer} disabled={players.length >= CONFIG.MAX_PLAYERS}>Add player</button>
        <button onClick={reset}>Reset</button>
      </div>
      {players.map(player => <Hand hand={player.hand} playerNo={player.playerNo} />)}
    </>
  );
}

export default App;
