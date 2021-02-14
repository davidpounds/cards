import { useState, useEffect } from 'react';
import './App.css';
import DECK from './data/deck';
import CONFIG from './data/config';
import { dealHand, shuffle, unassignedCards } from './utils/cardorder';
import Card from './components/Card';
import Players from './components/Players';
import InPlay from './components/InPlay';
import DeckSvgInline from './components/DeckSvgInline';

function App() {

  const [deck, setDeck] = useState(DECK);
  const [players, setPlayers] = useState([]);
  const [inPlay, setInPlay] = useState([]);

  useEffect(() => {
    setInPlay(deck.filter(card => card.inPlay));
  }, [deck]);

  const shuffleDeck = () => {
    setDeck(shuffle(deck));
  };

  const addPlayer = () => {
    const playerCount = players.length;
    if (playerCount >= CONFIG.MAX_PLAYERS) {
      return;
    }
    const playerNo = playerCount + 1;
    const newPlayer = `Player ${playerNo}`;
    const updatedDeck = dealHand(deck, CONFIG.CARDS_TO_DEAL, newPlayer);
    console.table(updatedDeck);
    setDeck(updatedDeck);
    setPlayers([...players, newPlayer]);
  };

  const reset = () => {
    // TODO
    deck.forEach(card => {
      card.player = null;
      card.inPlay = false;
    });
    setDeck(deck);
    setPlayers([]);
  };

  const unassigned = unassignedCards(deck);

  return (
    <main className="app" style={{ '--card-width': CONFIG.CARD_WIDTH, '--card-height': CONFIG.CARD_HEIGHT }}>
      <div className="cardlist deck">
        {unassigned.map(card => <Card key={`${card.suit}${card.value}`} {...card} />)}
      </div>
      <div>
        <button onClick={shuffleDeck}>Shuffle</button>
        <button onClick={addPlayer} disabled={players.length >= CONFIG.MAX_PLAYERS}>Add player</button>
        <button onClick={reset}>Reset</button>
      </div>
      <Players players={players} deck={deck} />
      <InPlay inPlay={inPlay} />
      <DeckSvgInline />
    </main>
  );
}

export default App;
