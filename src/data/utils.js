const isPopulatedArray = arr => Array.isArray(arr) && arr.length > 0;

const hasPlayersAndUsers = (players, users) => isPopulatedArray(players) && isPopulatedArray(users);

export const uniqueArray = arr => {
  const unique = [...new Set(arr)];
  console.log({arr, unique});
  return unique;
}

export const getAllocatedPlayers = (players = [], users = []) => hasPlayersAndUsers(players, users)
  ? users.filter(user => user.playerId !== null && players.includes(user.playerId))
  : [];

export const getUnallocatedPlayers = (players = [], users = []) => {
  if (!hasPlayersAndUsers(players, users)) return [];
  const allocatedPlayers = getAllocatedPlayers(players, users);
  return players.filter(player => !allocatedPlayers.includes(player));
};

export const getPlayerIdForUserId = (players = [], users = [], userId = null) => hasPlayersAndUsers(players, users) && userId
  ? players.find(player => player === users.find(user => user.id === userId)?.playerId)
  : null;

export const getUserForPlayerId = (users = [], playerId = null) => isPopulatedArray(users) && playerId
  ? users.find(user => user.playerId === playerId)
  : null;

export const getPlayerIndex = (players, playerId) => isPopulatedArray(players) && playerId
  ? players.indexOf(playerId)
  : -1;