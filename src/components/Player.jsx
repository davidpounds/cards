import './Player.css';
import { useSelector, useDispatch } from 'react-redux';
import { getPlayerCards, getInPlayCards } from '../store/selectors.js';
import { addCardToInPlay } from '../store/actions.js';

import Card from './Card.jsx';

const Player = props => {
  const { player, className, currentPlayer } = props;
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
      {hand.map(card => {
        const {value, suit} = player === currentPlayer ? card : {};
        // const {value, suit} = card;
        return <Card 
          key={`${card.suit}${card.value}`} 
          value={value} 
          suit={suit}
          onClick={addToInPlay(card)}
        />;
      })}
    </div>
  </section>;
};

export default Player;
