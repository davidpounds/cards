import url from 'url';
import * as ACTIONS from '../src/store/actiontypes.js';
import { updatePlayersState } from './index.js';
import { resetShuffleAndDeal } from './store.js';

export const connectionHandler = (ws, req, serverStore) => {
  const q = url.parse(req.url, true).query;
  const existingPlayerId = q.playerId;
  console.log({existingPlayerId});
  connectUser(serverStore, ws, existingPlayerId);

  ws.isAlive = true;
  ws.on('pong', () => pongHandler(ws));
  ws.on('message', messageHandler(ws, serverStore));
};

const pongHandler = ws => {
  ws.isAlive = true;
};

const messageHandler = (ws, serverStore) => rawMessage => {
  let message;
  try {
    message = JSON.parse(rawMessage);
  }
  catch (err) {
    message = { error: true };
  }
  if (!message.error) {
    const { type, data } = message;
    console.log(message);
    switch (type) {
      case ACTIONS.SERVER_ADD_CARD_TO_IN_PLAY:
        addCardToInPlay(serverStore, ws, data);
        break;
      case ACTIONS.SERVER_ADD_CARDS_TO_PLAYED:
        addCardsToPlayed(serverStore);
        break;
      case ACTIONS.SERVER_DEAL_HAND:
        resetShuffleAndDeal();
        updatePlayersState();
      default:
        break;
    }
  } else {
    console.log('Non-JSON string sent');
  }
};

const connectUser = (serverStore, ws, playerId = null) => {
  const { players } = serverStore;
  const availableUsers = players.filter(player => player.websocket === null);
  const existingPlayer = players.find(player => player.id === playerId && playerId !== null);
  console.log({availableUsers, existingPlayer});
  if (existingPlayer) {
    existingPlayer.websocket = ws;
  } else if (availableUsers.length > 0) {
    availableUsers[0].websocket = ws;
  }
  updatePlayersState();
};

const addCardToInPlay = (serverStore, ws, cardToAdd) => { // TODO - add player check to cards
  const { deck } = serverStore;
  const cardsAlreadyInPlay = deck.filter(card => card.inPlay);
  const playersAlreadyPlayed = [...new Set(cardsAlreadyInPlay.map(card => card.player))];
  if (!playersAlreadyPlayed.includes(cardToAdd.player)) {
    const card = deck.find(card => card.bitmask === cardToAdd.bitmask && card.player === cardToAdd.player);
    console.log({card});
    if (card) {
      card.inPlay = true;
      updatePlayersState();
    }
  }
};

const addCardsToPlayed = serverStore => {
  const { deck } = serverStore;
  deck.forEach(card => {
    if (card.inPlay) {
      card.inPlay = false;
      card.played = true;
    }
  });
  updatePlayersState();
};
