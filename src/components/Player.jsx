import './Player.css';
import { useState } from 'react';
import Card from './Card.jsx';
import ConnectionIndicator from './ConnectionIndicator.jsx';
import * as ACTIONS from '../store/actiontypes.js';

const Player = props => {
  const { 
    user, 
    player,
    className, 
    playerIndex, 
    currentUser, 
    isCurrentPlayer = false, 
    hand, 
    inPlay, 
    sendToServer,
    forceFollowSuit,
    currentSuit,
  } = props;

  const canPlay = inPlay.find(card => card.player === player) === undefined;
  const sortedHand = [...hand].sort((a, b) => a.bitmask - b.bitmask);
  const mustFollowSuit = forceFollowSuit && currentSuit !== null && hand.find(card => card.bitmask & currentSuit);
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
    sendToServer(ACTIONS.SERVER_ADD_CARD_TO_IN_PLAY, { card, currentUser });
    setSelectedCardBitmask(null);
  };

  return <section className={`player ${className} ${isCurrentPlayer ? 'current' : ''}`}>
    <h2 className="player-name" title={`${user?.id} / ${user?.playerId}`}>
      <ConnectionIndicator connected={user?.isConnected ?? false} />
      {user?.name ?? 'Unassigned'}<br />
      <span className="player-index">Player {playerIndex}</span>
    </h2>
    <div className={`cardlist hover-effect hand ${canPlay ? 'canplay' : 'cantplay'} ${mustFollowSuit ? 'follow-suit' : ''}`} data-empty-message="Hand is empty">
      {sortedHand.map(card => {
        const currentPlayerCard = player === currentUser?.playerId;
        const playableCard = !mustFollowSuit || (mustFollowSuit && (card.bitmask & currentSuit));
        const { bitmask } = card;
        let className = [];
        if (!currentPlayerCard || !playableCard) className = ['nohover'];
        if (isTouchDevice && selectedCardBitmask === card.bitmask) className = [...className, 'selected'];
        return <Card 
          key={bitmask} 
          className={className.join(' ')}
          bitmask={bitmask}
          onClick={currentPlayerCard && playableCard ? addToInPlay(card) : null}
          showBack={!currentPlayerCard}
        />;
      })}
    </div>
  </section>;
};

export default Player;
