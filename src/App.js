import { useState } from 'react';
import './App.css';
import DECK from './data/deck';
import CONFIG from './data/config';
import { dealHand, shuffle } from './utils/cardorder';
import Card from './components/Card';
import Players from './components/Players';
import InPlay from './components/InPlay';
import DeckSvgInline from './components/DeckSvgInline';

function App() {

  const [deck, setDeck] = useState(DECK);
  const [players, setPlayers] = useState([]);
  const [inPlay, setInPlay] = useState([]);

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
    setInPlay([]);
  };

  const addToInPlay = (playerNo, card) => () => {
    setInPlay([...inPlay, card]);
    const playerHand = players[playerNo - 1];
    playerHand.hand = playerHand.hand.filter(c => c !== card);
    setPlayers([...players]);
  };

  return (
    <main className="app" style={{ '--card-width': CONFIG.CARD_WIDTH, '--card-height': CONFIG.CARD_HEIGHT }}>
      <div className="cardlist deck">
        {deck.map(card => <Card key={`${card.suit}${card.value}`} {...card} />)}
        <DeckSvgInline />
      </div>
      <div>
        <button onClick={shuffleDeck}>Shuffle</button>
        <button onClick={addPlayer} disabled={players.length >= CONFIG.MAX_PLAYERS}>Add player</button>
        <button onClick={reset}>Reset</button>
      </div>
      <Players players={players} addToInPlay={addToInPlay} />
      <InPlay inPlay={inPlay} />
    </main>
  );
}

export default App;
