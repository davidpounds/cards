import './Players.css';
import Player from './Player.jsx';

const rotateArray = (arr, n) => {
  const length = arr.length;
  const rotateBy = (length - n) % length;
  return [...arr.slice(rotateBy, length), ...arr.slice(0, rotateBy)];
};

const Players = props => {
  const { store: { users = [], players = [], currentUser = null, deck = []}, sendToServer } = props;
  const inPlay = deck.filter(card => card.inPlay !== null);

  const currentPlayerIndex = players.indexOf(currentUser?.id);
  const sortedPlayers = rotateArray(players, 2 - (currentPlayerIndex === -1 ? 2 : currentPlayerIndex));

  return <>
    {sortedPlayers.map((playerId, idx) => {
      const player = users.find(user => user.id === playerId);
      const hand = deck.filter(card => card.player === playerId && card.inPlay === null && !card.played);
      const isCurrentPlayer = playerId === currentUser?.id;
      return <Player 
        className={`player${idx + 1}`}
        currentPlayer={currentUser}
        isCurrentPlayer={isCurrentPlayer}
        hand={hand}
        inPlay={inPlay}
        key={playerId} 
        player={player} 
        noOfPlayers={players.length}
        sendToServer={sendToServer}
      />
    })}
  </>;
}

export default Players;
