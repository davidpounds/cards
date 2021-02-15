import { ADD_PLAYER, RESET_PLAYERS } from '../actiontypes';

const initialState = {
  players: [],
};

const playerReducer = (state = initialState, action) => {
  const { player } = action?.data ?? { player: 'Unknown player' };
  switch (action.type) {
    case ADD_PLAYER:
      console.log({state});
      return {
        players: [...state.players, player],
      };
    case RESET_PLAYERS:
      return {
        players: [],
      }
    default:
      return initialState;
  }
};

export default playerReducer;
