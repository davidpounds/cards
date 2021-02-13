import './App.css';
import DECK from './data/deck';
import Card from './components/Card';
import DeckSvgInline from './components/DeckSvgInline';

function App() {
  return (
    <div className="app">
      {DECK.map(card => <Card {...card} />)}
      <DeckSvgInline />
    </div>
  );
}

export default App;
