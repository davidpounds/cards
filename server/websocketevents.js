import * as ACTIONS from '../src/store/actiontypes.js';
import { updatePlayersState } from './index.js';

export const connectionHandler = (ws, serverStore) => {
    
  ws.isAlive = true;

  ws.on('pong', () => pongHandler(ws));
  ws.on('message', messageHandler(ws, serverStore));

  updatePlayersState();
};

const pongHandler = ws => {
  ws.isAlive = true;
};

const messageHandler = (ws, serverStore) => rawMessage => {
  console.log('Received: %s', rawMessage);
  let message;
  try {
    message = JSON.parse(rawMessage);
  }
  catch (err) {
    message = {
      error: true,
    };
  }
  if (!message.error) {

    const { type, data } = message;
    switch (type) {
      case ACTIONS.CONNECT_USER:
        connectUser(serverStore, ws, data.playerId);
        break;
      case ACTIONS.ADD_CARD_TO_IN_PLAY:
        addCardToInPlay(serverStore, ws, data.cardBitmask);
        break;
      default:
        break;
    }

    if (message?.broadcast === true) {
      wss.clients.forEach(client => {
        if (client !== ws) {
          client.send(rawMessage);
        }
      });
    } else {
      ws.send(JSON.stringify({youSent: rawMessage}));
    }
  } else {
    ws.send(JSON.stringify({error: 'Non-JSON string sent'}));
  }
};

const connectUser = (serverStore, ws, playerId = null) => {
  const { players: users } = serverStore;
  const noOfConnectedUsers = users.filter(player => player.websocket !== null).length;
  if (noOfConnectedUsers <= users.length) {
    const [dealer, ...players] = users;
    const currentPlayer = noOfConnectedUsers === 0 ? dealer : players[noOfConnectedUsers - 1];
    currentPlayer.websocket = ws;
  }
  updatePlayersState();
};

const addCardToInPlay = (serverStore, ws, cardBitmask) => {
  const { deck, players } = serverStore;
  const currentPlayer = players.find(player => !player.isDealer && player.websocket === ws);
  if (currentPlayer) {
    const card = deck.find(card => card.bitmask === cardBitmask && card.player === currentPlayer.id);
    if (card) {
      card.inPlay = true;
    }
  }
  updatePlayersState();
};