import './Players.css';
import Hand from './Hand';

const Players = props => {
  const { players, addToInPlay } = props;
  return <div className="players">
    { players.map(player => <Hand key={player.playerNo} hand={player.hand} playerNo={player.playerNo} addToInPlay={addToInPlay} />) }
  </div>;
}

export default Players;
