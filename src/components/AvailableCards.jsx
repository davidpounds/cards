import { useSelector } from 'react-redux';
import { getAvailableCards } from '../store/selectors';
import Card from './Card';

const AvailableCards = props => {
  const available = useSelector(getAvailableCards);
  return <>
    <h2>Deck</h2>
    <div className="cardlist available" data-empty-message="No cards are available">
      {available.map(card => <Card key={`${card.suit}${card.value}`} />)}
    </div>
  </>;
};

export default AvailableCards;
