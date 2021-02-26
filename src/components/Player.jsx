import './Player.css';
import Card from './Card.jsx';
import * as ACTIONS from '../store/actiontypes.js';

const Player = props => {
  const { player, className, currentPlayer, hand, inPlay, sendToServer } = props;
  const canPlay = inPlay.find(card => card.player.id === player.id) === undefined;

  const addToInPlay = card => () => {
    console.log({card, canPlay, inPlay, player});
    if (canPlay) {
      sendToServer(ACTIONS.ADD_CARD_TO_IN_PLAY, card);
    }
  };

  return <section className={`player ${className}`}>
    <h2 className="player-name">
      {player.name}
    </h2>
    <div className={`cardlist hover-effect hand ${canPlay ? 'canplay' : 'cantplay'}`} data-empty-message="Hand is empty">
      {hand.map(card => {
        const showBack = player.id !== currentPlayer?.id;
        const { bitmask } = card;
        return <Card 
          key={bitmask} 
          bitmask={bitmask}
          onClick={addToInPlay(card)}
          showBack={showBack}
        />;
      })}
    </div>
  </section>;
};

export default Player;
