import './Players.css';
import { useSelector } from 'react-redux';
import { getPlayers } from '../store/selectors';
import Hand from './Hand';

const Players = props => {

  const players = useSelector(getPlayers);

  return <div className="players">
    {players.map(player => (
      <Hand 
        key={player} 
        player={player} 
      />
    ))}
  </div>;
}

export default Players;
