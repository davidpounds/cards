import './Player.css';
import { useState } from 'react';
import Card from './Card.jsx';
import ConnectionIndicator from './ConnectionIndicator.jsx';
import * as ACTIONS from '../store/actiontypes.js';

const Player = props => {
  const { player, className, currentPlayer, isCurrentPlayer = false, hand, inPlay, sendToServer } = props;
  const canPlay = inPlay.find(card => card.player.id === player?.id) === undefined;
  const sortedHand = [...hand].sort((a, b) => a.bitmask - b.bitmask);
  const isTouchDevice = 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
  const [selectedCardBitmask, setSelectedCardBitmask] = useState(null);

  const addToInPlay = card => () => {
    if (!canPlay) {
      return;
    }
    if (isTouchDevice && (selectedCardBitmask === null || selectedCardBitmask !== card.bitmask)) {
      setSelectedCardBitmask(card.bitmask);
      return;
    }
    sendToServer(ACTIONS.SERVER_ADD_CARD_TO_IN_PLAY, { card, currentPlayer });
    setSelectedCardBitmask(null);
  };

  return <section className={`player ${className} ${isCurrentPlayer ? 'current' : ''}`}>
    <h2 className="player-name">
      <ConnectionIndicator connected={player?.isConnected ?? false} />
      {player?.name}
    </h2>
    <div className={`cardlist hover-effect hand ${canPlay ? 'canplay' : 'cantplay'}`} data-empty-message="Hand is empty">
      {sortedHand.map(card => {
        const currentPlayerCard = player?.id === currentPlayer?.id;
        const { bitmask } = card;
        const className = `${currentPlayerCard ? '' : 'nohover'} ${isTouchDevice && selectedCardBitmask === card.bitmask ? 'selected' : ''}`;
        return <Card 
          key={bitmask} 
          className={className}
          bitmask={bitmask}
          onClick={currentPlayerCard ? addToInPlay(card) : null}
          showBack={!currentPlayerCard}
        />;
      })}
    </div>
  </section>;
};

export default Player;
