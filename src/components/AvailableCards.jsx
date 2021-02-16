import { useSelector } from 'react-redux';
import { getAvailableCards } from '../store/selectors';
import Card from './Card';

const AvailableCards = props => {
  const available = useSelector(getAvailableCards);
  return <>
    <h2>Available cards</h2>
    {available?.length > 0 && 
      <div className="cardlist available">
        {available.map(card => <Card key={`${card.suit}${card.value}`} />)}
      </div>
    }
    {(available?.length ?? 0) === 0 && <div>No cards are available</div>}
  </>;
};

export default AvailableCards;
