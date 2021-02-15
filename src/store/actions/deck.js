import { SHUFFLE_DECK, ADD_CARD_TO_IN_PLAY, DEAL_HAND, RESET_DECK } from '../actiontypes';

export const shuffleDeck = () => ({
  type: SHUFFLE_DECK,
});

export const addCardToInPlay = card => ({
  type: ADD_CARD_TO_IN_PLAY,
  data: {
    card,
  },
});

export const dealHand = (player, numberOfCards, availableCards) => ({
  type: DEAL_HAND,
  data: {
    player,
    numberOfCards,
    availableCards,
  },
});

export const resetDeck = () => ({
  type: RESET_DECK,
});
