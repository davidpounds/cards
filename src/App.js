import './App.css';
import DECK from './data/deck';
import Card from './components/Card';

function App() {
  return (
    <div className="app">
      {DECK.map(card => <Card {...card} />)}
    </div>
  );
}

export default App;
