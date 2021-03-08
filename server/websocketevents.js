import url from 'url';
import * as ACTIONS from '../src/store/actiontypes.js';
import CONFIG from '../src/data/config.js';
import User from './User.class.js';
import { updateClientState, disconnectAllUsers } from './index.js';
import { resetShuffleAndDeal } from './store.js';
import { getFullCardName } from '../src/data/PlayingCard.class.js';

export const connectionHandler = (ws, req, serverStore, connectedClientCount) => {
  if (connectedClientCount > CONFIG.MAX_USERS) {
    ws.terminate();
    return false;
  }
  const q = url.parse(req.url, true).query;
  const existingUserId = q[CONFIG.USER_ID_KEY];
  connectUser(serverStore, ws, existingUserId);

  ws.isAlive = true;
  ws.on('pong', () => pongHandler(ws));
  ws.on('close', () => closeHandler(ws, serverStore));
  ws.on('message', messageHandler(ws, serverStore));
};

const pongHandler = ws => {
  ws.isAlive = true;
};

export const closeHandler = (ws, serverStore) => {
  ws.isAlive = false;
  const disconnectingUser = serverStore.users.find(user => user.websocket === ws);
  if (disconnectingUser) {
    disconnectingUser.websocket = null;
  }
  serverStore.users = serverStore.users.filter(user => user !== disconnectingUser);
  updateClientState(`${disconnectingUser.name} has left`);
};

const messageHandler = (ws, serverStore) => rawMessage => { // TODO add an action for dealer to assign players
  let message;
  try {
    message = JSON.parse(rawMessage);
  }
  catch (err) {
    message = { error: true };
  }
  if (!message.error) {
    const { type, data } = message;
    switch (type) {
      case ACTIONS.SERVER_ADD_CARD_TO_IN_PLAY:
        addCardToInPlay(serverStore, data);
        break;
      case ACTIONS.SERVER_ADD_CARDS_TO_PLAYED:
        addCardsToPlayed(serverStore);
        break;
      case ACTIONS.SERVER_DEAL_HAND:
        resetShuffleAndDeal();
        updateClientState('The dealer dealt a new hand');
        break;
      case ACTIONS.SERVER_RESET_GAME:
        updateClientState('The dealer is ending this game and disconnecting all players');
        disconnectAllUsers();
        resetShuffleAndDeal(true);
        break;
      case ACTIONS.SERVER_CHANGE_USER_NAME:
        changeUserName(serverStore, ws, data);
        break;
      case ACTIONS.SERVER_ALLOCATE_USER_TO_PLAYER:
        allocateUserToPlayer(serverStore, data);
        break;
      case ACTIONS.SERVER_DEALLOCATE_USER_TO_PLAYER:
        deallocateUserToPlayer(serverStore, data);
        break;
      default:
        break;
    }
  } else {
    console.log('Non-JSON string sent');
  }
};

const connectUser = (serverStore, ws, userId = null) => {
  const { users } = serverStore;
  const existingUser = users.find(user => user.id === userId && userId !== null);
  if (existingUser) {
    existingUser.websocket = ws;
    updateClientState(`${existingUser.name} has connected`);
  } else {
    const isDealer = users.length === 0;
    const name = isDealer ? 'Dealer' : null;
    users.push(new User(ws, null, name, isDealer));
    updateClientState(`${users[users.length - 1].name} has connected`);
  }
};

const addCardToInPlay = (serverStore, cardToAdd) => {
  const { deck, players } = serverStore;
  const cardsAlreadyInPlay = deck.filter(card => card.inPlay !== null);
  const playersAlreadyPlayed = [...new Set(cardsAlreadyInPlay.map(card => card.player))];
  if (!playersAlreadyPlayed.includes(cardToAdd.player)) {
    const card = deck.find(card => card.bitmask === cardToAdd.bitmask && card.player === cardToAdd.player);
    if (card) {
      card.inPlay = new Date().getTime();
      const player = players.find(player => player.id === card.player);
      updateClientState(`${player.name} played the ${getFullCardName(card.bitmask)}`);
    }
  }
};

const addCardsToPlayed = serverStore => {
  const { deck } = serverStore;
  deck.forEach(card => {
    if (card.inPlay !== null) {
      card.inPlay = null;
      card.played = true;
    }
  });
  updateClientState(`The dealer cleared the played cards`);
};

const changeUserName = (serverStore, ws, data) => {
  const { users } = serverStore;
  const user = users.find(user => user.websocket === ws);
  if (user) {
    const oldName = user.name;
    const newName = data.name;
    user.name = newName;
    updateClientState(`${oldName} changed their name to ${newName}`);
  }
};

const allocateUserToPlayer = (serverStore, data) => {
  const { users, players } = serverStore;
  const { user } = data;
  if (!players.includes(user.id) && players.length < CONFIG.MAX_PLAYERS) {
    players.push(user.id);
    updateClientState(`Dealer added ${user.name} as a player`);
  }
};

const deallocateUserToPlayer = (serverStore, data) => {
  const { users, players } = serverStore;
  const { user } = data;
  if (players.includes(user.id)) {
    serverStore.players = players.filter(playerid => playerid !== user.id);
    updateClientState(`Dealer removed ${user.name} as a player`);
  }
};