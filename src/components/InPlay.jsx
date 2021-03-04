import './InPlay.css';
import Card from './Card.jsx';
import * as ACTIONS from '../store/actiontypes.js';

const InPlay = props => {
  const { store, sendToServer } = props;
  const { players, currentPlayer, deck } = store;
  const { isDealer = false } = currentPlayer ?? {};

  const playersWithoutDealer = players.filter(player => !player.isDealer);
  const inPlay = deck.filter(card => card.inPlay !== null).sort((a, b) => a.inPlay - b.inPlay);
  const currentPlayerIndex = playersWithoutDealer.map(player => player.id).indexOf(currentPlayer ? currentPlayer.id : null);
  const rotateAngle = currentPlayerIndex > -1 ? ((currentPlayerIndex + 2) % playersWithoutDealer.length) * 90 : 0;
  const allPlayersHavePlayed = inPlay?.length === playersWithoutDealer?.length;
  const addCardsToPlayedHandler = () => {
    if (allPlayersHavePlayed) {
      sendToServer(ACTIONS.SERVER_ADD_CARDS_TO_PLAYED);
    }
  };
  return <div className="in-play" style={{ '--rotate-angle': `-${rotateAngle}deg` }}>
    {allPlayersHavePlayed && isDealer && <div className="move-to-played">
      <button onClick={addCardsToPlayedHandler} title="Move to played">
        <svg><use href="#clear" /></svg>
      </button>
    </div>}
    {inPlay.map(card => {
      const cardPlayer = players.find(player => player.id === card.player);
      return <Card 
        key={`${card.bitmask}`} 
        bitmask={card.bitmask}
        player={cardPlayer}
        className={`player${playersWithoutDealer.map(player => player.id).indexOf(card.player) + 1}`}
      />;
    })}
  </div>;
};

export default InPlay;
