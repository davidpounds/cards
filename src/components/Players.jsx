import './Players.css';
import Hand from './Hand';

const Players = props => {
  const { players } = props;
  return <div className="players">
    { players.map(player => (
      <Hand 
        key={player} 
        player={player} 
      />
    )) }
  </div>;
}

export default Players;
