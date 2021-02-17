import * as ACTIONS from './actiontypes';
import CONFIG from '../data/config';
import getResetDeck from '../data/deck';
import { shuffleDeck } from '../data/randomizing';

const initialPlayers = [...new Array(CONFIG.MAX_PLAYERS).keys()].map(i => `Player ${i + 1}`);

const initialState = {
  deck: shuffleDeck(getResetDeck()),
  players: initialPlayers,
};

export default (state = initialState, action) => {
  const { data = {}, type = null } = action;

  switch (type) {
    case ACTIONS.ADD_CARD_TO_IN_PLAY:
      return addCardToInPlay(state, data);
    case ACTIONS.DEAL_HAND:
      return dealHand(state, data);
    case ACTIONS.RESET:
      return reset(state);
    case ACTIONS.ADD_CARDS_TO_PLAYED:
      return addCardsToPlayed(state, data);
    default:
      return state;
  }
};

const addCardToInPlay = (state, data) => {
  data.card.inPlay = true;
  return {
    ...state,
    deck: [...state.deck],
  };
};

const dealHand = (state, data) => {
  const { availableCards, numberOfCards, player } = data;
  if (availableCards.length >= numberOfCards) {
    availableCards.slice(0, numberOfCards).forEach(card => {
      card.player = player;
    });
  }
  return {
    ...state,
    deck: [...state.deck],
  };
};

const reset = state => ({
  ...state,
  deck: shuffleDeck(getResetDeck()),
});

const addCardsToPlayed = (state, data) => {
  data.cardsInPlay.forEach(card => {
    card.player = null;
  });
  return {
    ...state,
  };
}
