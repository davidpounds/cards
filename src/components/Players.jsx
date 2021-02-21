import './Players.css';
import { useSelector } from 'react-redux';
import { getPlayers } from '../store/selectors';
import Player from './Player';

const Players = props => {
  const { currentPlayer = null } = props;
  const players = useSelector(getPlayers(currentPlayer));

  return <>
    {players.map((player, idx) => (
      <Player 
        className={`player${idx + 1}`}
        key={player} 
        player={player} 
        noOfPlayers={players.length}
      />
    ))}
  </>;
}

export default Players;
