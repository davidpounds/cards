import CONFIG from '../data/config';
import { useDispatch, useSelector } from 'react-redux';
import { resetGame, dealHand } from '../store/actions';
import { getPlayers, getAvailableCards } from '../store/selectors';

const GameControls = props => {

  const players = useSelector(getPlayers);
  const availableCards = useSelector(getAvailableCards);
  const dispatch = useDispatch();

  const reset = () => {
    dispatch(resetGame());
  }

  const dealHandler = () => {
    const numberOfCards = Math.floor(CONFIG.CARDS_IN_DECK / players.length);
    dispatch(dealHand(players, numberOfCards, availableCards));
  };

  return <div>
    <button onClick={reset}>Reset game</button>
    <button onClick={dealHandler} disabled={availableCards.length === 0}>Deal hand</button>
  </div>;
}

export default GameControls;
