import './Hand.css';
import CONFIG from '../data/config';
import { useSelector, useDispatch } from 'react-redux';
import { getPlayerCards, getInPlayCards, getAvailableCards } from '../store/selectors';
import { addCardToInPlay, dealHand } from '../store/actions';

import Card from './Card';

const Hand = props => {
  const { player } = props;
  const dispatch = useDispatch();
  const unassigned = useSelector(getAvailableCards);
  const hand = useSelector(getPlayerCards(player));
  const inPlay = useSelector(getInPlayCards);
  const canPlay = inPlay.find(card => card.player === player) === undefined;

  const addToInPlay = card => () => {
    if (canPlay) {
      dispatch(addCardToInPlay(card));
    }
  };

  const dealHandHandler = () => {
    dispatch(dealHand(player, CONFIG.CARDS_TO_DEAL, unassigned));
  }

  return <section className="player">
    <h2>{player}</h2>
    {hand?.length === 0 && (
      <>
        <p>Waiting for cards</p>
        <button onClick={dealHandHandler}>Deal hand</button>
      </>
    )}
    {hand?.length > 0 && canPlay && <p>Ready to play</p>}
    {hand?.length > 0 && !canPlay && <p>Has played</p>}
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
