import './GameControls.css';
import { useDispatch, useSelector } from 'react-redux';
import { resetGame, dealHand } from '../store/actions';
import { getPlayers } from '../store/selectors';

const GameControls = props => {

  const players = useSelector(getPlayers);
  const dispatch = useDispatch();

  const dealHandler = () => {
    dispatch(resetGame());
    dispatch(dealHand(players));
  };

  return <div className="game-controls">
    <button onClick={dealHandler} title="Reset and deal hand">
      <svg><use href="#reset" /></svg>
    </button>
  </div>;
}

export default GameControls;
