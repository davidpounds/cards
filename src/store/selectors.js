import { CARD_STATUS } from '../data/PlayingCard.class';
import SUIT from '../data/suits';

const suitSortOrder = [SUIT.SPADES, SUIT.DIAMONDS, SUIT.CLUBS, SUIT.HEARTS];

export const getDeck = store => store.deck;

export const getAvailableCards = store => getDeck(store)
  .filter(card => card.status === CARD_STATUS.IN_DECK);

export const getPlayerCards = player => store => getDeck(store)
  .filter(card => card.status === CARD_STATUS.IN_PLAYER_HAND && card.player === player)
  .sort((a, b) => {
    const suitSort = suitSortOrder.indexOf(a?.suit) - suitSortOrder.indexOf(b?.suit);
    if (suitSort !== 0) return suitSort;
    return (a?.value ?? 0) - (b?.value ?? 0);
  });

export const getInPlayCards = store => getDeck(store)
  .filter(card => card.status === CARD_STATUS.IN_PLAY);

export const getPlayedCards = store => getDeck(store)
  .filter(card => card.status === CARD_STATUS.PLAYED);

export const getPlayers = store => store.players;
