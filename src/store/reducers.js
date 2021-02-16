import * as ACTIONS from './actiontypes';
import getResetDeck from '../data/deck';

const initialState = {
  deck: getResetDeck(),
  players: [],
};

export default (state = initialState, action) => {
  const { data = {}, type = null } = action;
  const { player = 'Unknown player', numberOfCards = 0, availableCards = [], card = null, cardsInPlay = [] } = data;
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
    case ACTIONS.ADD_PLAYER:
      return {
        ...state,
        players: [...players, player],
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
