import './PlayedCards.css';
import { useSelector } from 'react-redux';
import { getPlayedCards } from '../store/selectors.js';
import Card from './Card.jsx';

const PlayedCards = props => {
  const played = useSelector(getPlayedCards);
  return <div className="played-cards">
    <h2>Played</h2>
    <div className="cardlist played" data-empty-message="No cards have been played">
      {played.map(card => <Card key={`${card.bitmask}`} />)}
    </div>
  </div>;
};

export default PlayedCards;
