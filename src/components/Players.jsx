import './Players.css';
import Hand from './Hand';

const Players = props => {
  const { deck, players } = props;
  return <div className="players">
    { players.map(player => (
      <Hand 
        key={player} 
        player={player} 
        deck={deck}
      />
    )) }
  </div>;
}

export default Players;
