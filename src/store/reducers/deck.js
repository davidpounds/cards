import { SHUFFLE_DECK, ADD_CARD_TO_IN_PLAY, DEAL_HAND, RESET_DECK } from '../actiontypes';
import DECK from '../../data/deck';

const initialState = {
  deck: DECK,
};

const deckReducer = (state = initialState, action) => {
  const { data = null } = action;
  switch (action.type) {
    case SHUFFLE_DECK:
      return {
        deck: [...state.deck].sort(() => Math.random() - 0.5)
      };
    case ADD_CARD_TO_IN_PLAY:
      data.card.inPlay = true;
      return {
        deck: [...state.deck],
      }
    case DEAL_HAND:
      const { player, numberOfCards, availableCards } = data;
      if (availableCards.length >= numberOfCards) {
        availableCards.slice(0, numberOfCards).forEach(card => {
          card.player = player;
        });
      }
      return {
        deck: [...state.deck],
      };
    case RESET_DECK:
      return initialState;
    default:
      return state;
  }
};

export default deckReducer;
