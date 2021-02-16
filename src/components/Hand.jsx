import './Hand.css';
import { useSelector, useDispatch } from 'react-redux';
import { getPlayerCards } from '../store/selectors';
import { addCardToInPlay } from '../store/actions';
import Card from './Card';

const Hand = props => {
  const dispatch = useDispatch();
  const { player } = props;
  const hand = useSelector(getPlayerCards(player));

  const addToInPlay = card => () => {
    dispatch(addCardToInPlay(card));
  };

  return <section className="player">
    <h2>{player}</h2>
    <div className="cardlist hand">
      {hand.map(card => (
        <Card 
          key={`${card.suit}${card.value}`} 
          value={card.value} 
          suit={card.suit}
          onClick={addToInPlay(card)}
        />))}
    </div>
  </section>;
};

export default Hand;
