import './Players.css';
import { useSelector } from 'react-redux';
import { getPlayers } from '../store/selectors';
import Player from './Player';

const Players = props => {

  const players = useSelector(getPlayers);

  return <div className="players">
    {players.map(player => (
      <Player 
        key={player} 
        player={player} 
        noOfPlayers={players.length}
      />
    ))}
  </div>;
}

export default Players;
