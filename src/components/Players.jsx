import './Players.css';
import { useDispatch, useSelector } from 'react-redux';
import { getPlayers } from '../store/selectors';
import { addPlayer } from '../store/actions';
import CONFIG from '../data/config';
import Hand from './Hand';

const Players = props => {
  const dispatch = useDispatch();

  const players = useSelector(getPlayers);

  const addPlayerHandler = () => {
    const playerCount = players.length;
    if (playerCount >= CONFIG.MAX_PLAYERS) {
      return;
    }
    const playerNo = playerCount + 1;
    const newPlayer = `Player ${playerNo}`;
    dispatch(addPlayer(newPlayer));
  };

  return <>
    <button onClick={addPlayerHandler} disabled={players.length >= CONFIG.MAX_PLAYERS}>Add player</button>
    <div className="players">
      { players.map(player => (
        <Hand 
          key={player} 
          player={player} 
        />
      )) }
    </div>
  </>;
}

export default Players;
