import * as ACTIONS from './actiontypes.js';
import CONFIG from '../data/config.js';
import getResetDeck from '../data/deck.js';
import { shuffleDeck } from '../data/randomizing.js';

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
    case ACTIONS.UPDATE_STORE:
      return updateStore(state, data);
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
  const { players } = data;
  const numberOfPlayers = players.length;
  const numberOfCards = Math.floor(CONFIG.CARDS_IN_DECK / numberOfPlayers);
  const numberOfCardsToDeal = numberOfCards * numberOfPlayers;
  [...new Array(numberOfCardsToDeal).keys()].forEach(i => {
    const playerIndex = Math.floor(i / numberOfCards);
    state.deck[i].player = players[playerIndex];
  });
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
};

const updateStore = (state, data) => {
  return {
    ...state,
    ...data.state,
  };
};
