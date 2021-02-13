import { useState } from 'react';
import './App.css';
import DECK from './data/deck';
import Card from './components/Card';
import DeckSvgInline from './components/DeckSvgInline';

function App() {

  const [deck, setDeck] = useState(DECK);

  const shuffleDeck = () => {
    const shuffledDeck = [...deck].sort((a, b) => Math.random() - 0.5);
    setDeck(shuffledDeck);
  };

  return (
    <div className="app">
      {deck.map(card => <Card {...card} />)}
      <button onClick={shuffleDeck}>Shuffle</button>
      <DeckSvgInline />
    </div>
  );
}

export default App;
