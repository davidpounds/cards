import * as ACTIONS from './actiontypes';
import CONFIG from '../data/config';
import getResetDeck from '../data/deck';

const initialPlayers = [...new Array(CONFIG.MAX_PLAYERS).keys()].map(i => `Player ${i + 1}`);

const initialState = {
  deck: getResetDeck(),
  players: initialPlayers,
};

export default (state = initialState, action) => {
  const { data = {}, type = null } = action;
  const { 
    player = 'Unknown player', 
    numberOfCards = 0, 
    availableCards = [], 
    card = null, 
    cardsInPlay = [], 
  } = data;
  const { deck, players } = state;

  switch (type) {
    case ACTIONS.SHUFFLE_DECK:
      return {
        ...state,
        deck: [...deck].sort(() => Math.random() - 0.5)
      };
    case ACTIONS.ADD_CARD_TO_IN_PLAY:
      card.inPlay = true;
      return {
        ...state,
        deck: [...deck],
      }
    case ACTIONS.DEAL_HAND:
      if (availableCards.length >= numberOfCards) {
        availableCards.slice(0, numberOfCards).forEach(card => {
          card.player = player;
        });
      }
      return {
        ...state,
        deck: [...deck],
      };
    case ACTIONS.RESET:
      return {
        deck: getResetDeck(),
        players: [],
      };
    case ACTIONS.ADD_CARDS_TO_PLAYED:
      cardsInPlay.forEach(card => {
        card.player = null;
      });
      return {
        ...state,
      };
    default:
      return state;
  }
};
