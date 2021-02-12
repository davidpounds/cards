import './App.css';
import DECK from './data/deck';
import Card from './components/Card';
import deckImg from './deck.svg';

function App() {
  return (
    <>
      <div className="app">
        {DECK.map(card => <Card {...card} />)}
      </div>
      <img src={deckImg} style={{ width: '100%', height: 'auto' }} />
    </>
  );
}

export default App;
