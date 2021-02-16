import './Hand.css';
import { useSelector, useDispatch } from 'react-redux';
import { getPlayerCards, getInPlayCards } from '../store/selectors';
import { addCardToInPlay } from '../store/actions';
import Card from './Card';

const Hand = props => {
  const { player } = props;
  const dispatch = useDispatch();
  const hand = useSelector(getPlayerCards(player));
  const inPlay = useSelector(getInPlayCards);
  const canPlay = inPlay.find(card => card.player === player) === undefined;

  const addToInPlay = card => () => {
    if (canPlay) {
      dispatch(addCardToInPlay(card));
    }
  };

  return <section className="player">
    <h2>{player}</h2>
    {canPlay && <p>Ready to play</p>}
    {!canPlay && <p>Has played</p>}
    <div className={`cardlist hand ${canPlay ? 'canplay' : 'cantplay'}`}>
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
