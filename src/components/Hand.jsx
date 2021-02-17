import './Hand.css';
import CONFIG from '../data/config';
import { useSelector, useDispatch } from 'react-redux';
import { getPlayerCards, getInPlayCards, getAvailableCards } from '../store/selectors';
import { addCardToInPlay, dealHand } from '../store/actions';

import Card from './Card';

const Hand = props => {
  const { player, noOfPlayers } = props;
  const dispatch = useDispatch();
  const unassigned = useSelector(getAvailableCards);
  const hand = useSelector(getPlayerCards(player));
  const inPlay = useSelector(getInPlayCards);
  const canPlay = inPlay.find(card => card.player === player) === undefined;
  const equalCardsPerPlayer = (CONFIG.CARDS_IN_DECK % noOfPlayers) === 0;
  const cardsPerPlayer = CONFIG.CARDS_IN_DECK / noOfPlayers;
  const cardsToDeal = equalCardsPerPlayer ? cardsPerPlayer : Math.floor(cardsPerPlayer); // TODO - decide how to deal with extra cards

  const addToInPlay = card => () => {
    if (canPlay) {
      dispatch(addCardToInPlay(card));
    }
  };

  const dealHandHandler = () => {
    dispatch(dealHand(player, cardsToDeal, unassigned));
  }

  return <section className="player">
    <h2>{player}</h2>
    {hand?.length === 0 && <p><button onClick={dealHandHandler}>Deal hand</button></p>}
    {hand?.length > 0 && canPlay && <p>Ready to play</p>}
    {hand?.length > 0 && !canPlay && <p>Has played</p>}
    <div className={`cardlist hover-effect hand ${canPlay ? 'canplay' : 'cantplay'}`} data-empty-message="Hand is empty">
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
