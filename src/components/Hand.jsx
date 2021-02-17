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
    <h2>
      {player}
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

export default Hand;
