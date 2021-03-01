import './Player.css';
import Card from './Card.jsx';
import * as ACTIONS from '../store/actiontypes.js';

const Player = props => {
  const { player, className, currentPlayer, hand, inPlay, sendToServer } = props;
  const canPlay = inPlay.find(card => card.player.id === player.id) === undefined;
  const sortedHand = [...hand].sort((a, b) => a.bitmask - b.bitmask);

  const addToInPlay = card => () => {
    if (canPlay) {
      sendToServer(ACTIONS.SERVER_ADD_CARD_TO_IN_PLAY, card);
    }
  };

  return <section className={`player ${className}`}>
    <h2 className="player-name">
      {player.name} ({player.isConnected ? 'online' : 'offline' })
    </h2>
    <div className={`cardlist hover-effect hand ${canPlay ? 'canplay' : 'cantplay'}`} data-empty-message="Hand is empty">
      {sortedHand.map(card => {
        const currentPlayerCard = player.id === currentPlayer?.id;
        const { bitmask } = card;
        return <Card 
          key={bitmask} 
          className={currentPlayerCard ? null : 'nohover'}
          bitmask={bitmask}
          onClick={currentPlayerCard ? addToInPlay(card) : null}
          showBack={!currentPlayerCard}
        />;
      })}
    </div>
  </section>;
};

export default Player;
