import url from 'url';
import * as ACTIONS from '../src/store/actiontypes.js';
import { updatePlayersState, disconnectAllPlayers } from './index.js';
import { resetShuffleAndDeal } from './store.js';
import { getFullCardName } from '../src/data/PlayingCard.class.js';

export const connectionHandler = (ws, req, serverStore) => {
  const q = url.parse(req.url, true).query;
  const existingPlayerId = q.playerId;
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
    switch (type) {
      case ACTIONS.SERVER_ADD_CARD_TO_IN_PLAY:
        addCardToInPlay(serverStore, data);
        break;
      case ACTIONS.SERVER_ADD_CARDS_TO_PLAYED:
        addCardsToPlayed(serverStore);
        break;
      case ACTIONS.SERVER_DEAL_HAND:
        resetShuffleAndDeal();
        updatePlayersState('The dealer dealt a new hand');
      case ACTIONS.SERVER_RESET_GAME:
        disconnectAllPlayers();
        resetShuffleAndDeal(true);
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
  if (existingPlayer) {
    existingPlayer.websocket = ws;
    updatePlayersState(`${existingPlayer.name} has connected`);
  } else if (availableUsers.length > 0) {
    availableUsers[0].websocket = ws;
    updatePlayersState(`${availableUsers[0].name} has connected`);
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
      updatePlayersState(`${player.name} played the ${getFullCardName(card.bitmask)}`);
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
  updatePlayersState(`The dealer cleared the played cards`);
};
