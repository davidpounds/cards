import { ADD_PLAYER, RESET_PLAYERS } from '../actiontypes';

export const addPlayer = player => ({
  type: ADD_PLAYER,
  data: {
    player,
  },
});

export const resetPlayers = () => ({
  type: RESET_PLAYERS,
})
