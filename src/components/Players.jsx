import './Players.css';
import { useSelector } from 'react-redux';
import { getPlayers } from '../store/selectors';
import Player from './Player';

const Players = props => {

  const players = useSelector(getPlayers);

  return <div className="players">
    {players.map((player, idx) => (
      <Player 
        key={player} 
        player={player} 
        noOfPlayers={players.length}
        className={`player${idx + 1}`}
      />
    ))}
  </div>;
}

export default Players;
