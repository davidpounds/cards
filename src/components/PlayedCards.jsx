import { useSelector } from 'react-redux';
import { getPlayedCards } from '../store/selectors';
import Card from './Card';

const PlayedCards = props => {
  const played = useSelector(getPlayedCards);
  return <div className="played-cards">
    <h2>Played</h2>
    <div className="cardlist played" data-empty-message="No cards have been played">
      {played.map(card => <Card key={`${card.suit}${card.value}`} />)}
    </div>
  </div>;
};

export default PlayedCards;
