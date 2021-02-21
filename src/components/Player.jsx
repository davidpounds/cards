import './Player.css';
import { useSelector, useDispatch } from 'react-redux';
import { getPlayerCards, getInPlayCards } from '../store/selectors';
import { addCardToInPlay } from '../store/actions';

import Card from './Card';

const Player = props => {
  const { player, className } = props;
  const dispatch = useDispatch();
  const hand = useSelector(getPlayerCards(player));
  const inPlay = useSelector(getInPlayCards);
  const canPlay = inPlay.find(card => card.player === player) === undefined;

  const addToInPlay = card => () => {
    if (canPlay) {
      dispatch(addCardToInPlay(card));
    }
  };

  return <section className={`player ${className}`}>
    <h2 className="player-name">
      {player}
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

export default Player;
