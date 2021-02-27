import './Players.css';
import Player from './Player.jsx';

const Players = props => {
  const { store: { players, currentPlayer, deck}, sendToServer } = props;
  const inPlay = deck.filter(card => card.inPlay);
  const nonDealerPlayers = players.filter(player => !player.isDealer);

  return <>
    {nonDealerPlayers.map((player, idx) => {
      const hand = deck.filter(card => card.player === player.id && !card.inPlay && !card.played);
      return <Player 
        className={`player${idx + 1}`}
        currentPlayer={currentPlayer}
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
