import './InPlay.css';
import Card from './Card.jsx';
import * as ACTIONS from '../store/actiontypes.js';

const InPlay = props => {
  const { store: {players, currentPlayer, deck}, sendToServer } = props;
  console.log({ players, currentPlayer, deck });
  const inPlay = deck.filter(card => card.inPlay);
  const currentPlayerIndex = players.map(player => player.id).indexOf(currentPlayer ? currentPlayer.id : null);
  const rotateAngle = currentPlayerIndex > -1 ? ((currentPlayerIndex + 2) % players.length) * 90 : 0;
  const allPlayersHavePlayed = inPlay?.length === players?.length;
  const addCardsToPlayedHandler = () => {
    if (allPlayersHavePlayed) {
      sendToServer(ACTIONS.ADD_CARDS_TO_PLAYED);
    }
  };
  return <div className="in-play" style={{ '--rotate-angle': `-${rotateAngle}deg` }}>
    {allPlayersHavePlayed && <div className="move-to-played">
      <button onClick={addCardsToPlayedHandler} title="Move to played">
        <svg><use href="#clear" /></svg>
      </button>
    </div>}
    {inPlay.map(card => <Card 
      key={`${card.bitmask}`} 
      bitmask={card.bitmask}
      className={`player${players.indexOf(card.player) + 1}`}
    />)}
  </div>;
};

export default InPlay;
