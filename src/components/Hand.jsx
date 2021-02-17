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
    <h2>
      {player}
      {hand?.length === 0 && <button className="btn-deal" title="Deal hand" onClick={dealHandHandler}><Deal /></button>}
      {hand?.length > 0 && canPlay && <Waiting />}
      {hand?.length > 0 && !canPlay && <Played />}
    </h2>
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

const Waiting = () => <svg className="icon"><use href="#waiting" /></svg>;
const Played = () => <svg className="icon"><use href="#tick" /></svg>;
const Deal = () => <svg className="icon deal-icon"><use href="#back" /></svg>;

export default Hand;
