import './Players.css';
import { useSelector } from 'react-redux';
import { getPlayers } from '../store/selectors.js';
import Player from './Player.jsx';

const Players = props => {
  const { currentPlayer = null } = props;
  const players = useSelector(getPlayers(currentPlayer));

  return <>
    {players.map((player, idx) => (
      <Player 
        className={`player${idx + 1}`}
        currentPlayer={currentPlayer}
        key={player} 
        player={player} 
        noOfPlayers={players.length}
      />
    ))}
  </>;
}

export default Players;
