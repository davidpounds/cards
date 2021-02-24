import './AvailableCards.css';
import { useSelector } from 'react-redux';
import { getAvailableCards } from '../store/selectors.js';
import Card from './Card.jsx';

const AvailableCards = props => {
  const available = useSelector(getAvailableCards);
  return <div className="available-cards">
    <h2>Deck</h2>
    <div className="cardlist available" data-empty-message="No cards are available">
      {available.map(card => <Card key={`${card.suit}${card.value}`} />)}
    </div>
  </div>;
};

export default AvailableCards;
