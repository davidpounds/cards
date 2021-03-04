import './Players.css';
import Player from './Player.jsx';

const rotateArray = (arr, n) => {
  const length = arr.length;
  const rotateBy = (length - n) % length;
  return [...arr.slice(rotateBy, length), ...arr.slice(0, rotateBy)];
};

const Players = props => {
  const { store: { players, currentPlayer, deck}, sendToServer } = props;
  const inPlay = deck.filter(card => card.inPlay !== null);
  const nonDealerPlayers = players.filter(player => !player.isDealer);
  const currentPlayerIndex = nonDealerPlayers.map(player => player.id).indexOf(currentPlayer?.id);
  const sortedPlayers = rotateArray(nonDealerPlayers, 2 - (currentPlayerIndex === -1 ? 2 : currentPlayerIndex));

  return <>
    {sortedPlayers.map((player, idx) => {
      const hand = deck.filter(card => card.player === player.id && card.inPlay === null && !card.played);
      const isCurrentPlayer = player.id === currentPlayer?.id;
      return <Player 
        className={`player${idx + 1}`}
        currentPlayer={currentPlayer}
        isCurrentPlayer={isCurrentPlayer}
        hand={hand}
        inPlay={inPlay}
        key={player.id} 
        player={player} 
        noOfPlayers={players.length}
        sendToServer={sendToServer}
      />
    })}
  </>;
}

export default Players;
