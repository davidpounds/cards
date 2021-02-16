import * as ACTIONS from './actiontypes';

export const shuffleDeck = () => ({
  type: ACTIONS.SHUFFLE_DECK,
});

export const addCardToInPlay = card => ({
  type: ACTIONS.ADD_CARD_TO_IN_PLAY,
  data: {
    card,
  },
});

export const dealHand = (player, numberOfCards, availableCards) => ({
  type: ACTIONS.DEAL_HAND,
  data: {
    player,
    numberOfCards,
    availableCards,
  },
});

export const resetGame = () => ({
  type: ACTIONS.RESET,
});

export const addPlayer = player => ({
  type: ACTIONS.ADD_PLAYER,
  data: {
    player,
  },
});

export const addCardsToPlayed = cardsInPlay => ({
  type: ACTIONS.ADD_CARDS_TO_PLAYED,
  data: {
    cardsInPlay,
  },
});
