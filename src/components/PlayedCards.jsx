import { useSelector } from 'react-redux';
import { getPlayedCards } from '../store/selectors';
import Card from './Card';

const PlayedCards = props => {
  const played = useSelector(getPlayedCards);
  return <>
    <h2>Played</h2>
    <div className="cardlist played">
      {played.map(card => <Card key={`${card.suit}${card.value}`} suit={card.suit} value={card.value} />)}
    </div>
  </>;
};

export default PlayedCards;
