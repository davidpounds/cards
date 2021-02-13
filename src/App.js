import { useState } from 'react';
import './App.css';
import DECK from './data/deck';
import { dealHand } from './utils/cardorder';
import Card from './components/Card';
import Hand from './components/Hand';
import DeckSvgInline from './components/DeckSvgInline';

function App() {

  const [deck, setDeck] = useState(DECK);
  const [dealtHand, setDealtHand] = useState([]);

  const shuffleDeck = () => {
    const shuffledDeck = [...deck].sort((a, b) => Math.random() - 0.5);
    setDeck(shuffledDeck);
  };

  const deal = () => {
    const { hand, newDeck } = dealHand(deck, 7);
    setDealtHand(hand);
    setDeck(newDeck);
  };

  const reset = () => {
    setDeck(DECK);
    setDealtHand([]);
  };

  return (
    <>
      <div className="app cardlist">
        {deck.map(card => <Card {...card} />)}
        <DeckSvgInline />
      </div>
      <div>
        <button onClick={shuffleDeck}>Shuffle</button>
        <button onClick={deal}>Deal</button>
        <button onClick={reset}>Reset</button>
      </div>
      <Hand hand={dealtHand} />
    </>
  );
}

export default App;
