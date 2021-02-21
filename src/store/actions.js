import * as ACTIONS from './actiontypes';

export const addCardToInPlay = card => ({
  type: ACTIONS.ADD_CARD_TO_IN_PLAY,
  data: {
    card,
  },
});

export const dealHand = (players) => ({
  type: ACTIONS.DEAL_HAND,
  data: {
    players,
  },
});

export const resetGame = () => ({
  type: ACTIONS.RESET,
});

export const addCardsToPlayed = cardsInPlay => ({
  type: ACTIONS.ADD_CARDS_TO_PLAYED,
  data: {
    cardsInPlay,
  },
});
