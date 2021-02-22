import { CARD_STATUS } from '../data/PlayingCard.class';
import SUITS from '../data/suits';

const suitSortOrder = Object.values(SUITS);

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
 
export const getCurrentPlayerIndex = currentPlayer => store => store.players.indexOf(currentPlayer);

export const getPlayers = currentPlayer => store => {
  const { players } = store;
  const currentPlayerIndex = getCurrentPlayerIndex(currentPlayer)(store);
  if (currentPlayerIndex === -1) {
    return players;
  }
  const rotateArray = (arr, count = 1) => [...arr.slice(count, arr.length), ...arr.slice(0, count)];
  return rotateArray(players, (2 + currentPlayerIndex) % players.length);
}
