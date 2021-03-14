import './Players.css';
import Player from './Player.jsx';
import { getPlayerIdForUserId, getUserForPlayerId, getPlayerIndex } from '../data/utils.js';

const rotateArray = (arr, n) => {
  const length = arr.length;
  const rotateBy = (length - n) % length;
  return [...arr.slice(rotateBy, length), ...arr.slice(0, rotateBy)];
};

const Players = props => {
  const { store: { users = [], players = [], currentUser = null, deck = []}, sendToServer } = props;
  const inPlay = deck.filter(card => card.inPlay !== null);

  const currentPlayerIndex = getPlayerIndex(players, getPlayerIdForUserId(players, users, currentUser?.id));
  const sortedPlayers = rotateArray(players, 2 - (currentPlayerIndex === -1 ? 2 : currentPlayerIndex));

  return <>
    {sortedPlayers.map((player, idx) => {
      const user = getUserForPlayerId(users, player);
      const playerIndex = players.indexOf(player);
      const hand = deck.filter(card => card.player === player && card.inPlay === null && !card.played);
      const isCurrentPlayer = player === currentUser?.playerId;
      return <Player 
        className={`player${idx + 1}`}
        currentUser={currentUser}
        isCurrentPlayer={isCurrentPlayer}
        hand={hand}
        inPlay={inPlay}
        key={player} 
        playerIndex={playerIndex + 1}
        player={player}
        user={user} 
        noOfPlayers={players.length}
        sendToServer={sendToServer}
      />
    })}
  </>;
}

export default Players;
