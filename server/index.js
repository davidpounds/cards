import express from 'express';
import http from 'http';
import WebSocket from 'ws';
import path from 'path';
import bodyParser from 'body-parser';
import serverStore, { resetShuffleAndDeal } from './store.js';
import { connectionHandler } from './websocketevents.js';
import * as ACTIONS from '../src/store/actiontypes.js';

const __dirname = path.resolve();
const devSeperator = !process.env.PORT ? '..' : '';
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, devSeperator, 'build')));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, devSeperator, 'build', 'index.html'));
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

resetShuffleAndDeal();

wss.on('connection', (ws, req) => connectionHandler(ws, req, serverStore));

const stripWebSocket = player => {
  if (!player) return null;
  const { websocket, ...strippedPlayer } = player;
  return {...strippedPlayer, isConnected: websocket !== null};
};

export const updatePlayersState = (message = null) => {
  const { players } = serverStore;
  const mappedPlayers = players.map(player => stripWebSocket(player));
  wss.clients.forEach(ws => {
    const currentPlayer = stripWebSocket(players.find(player => player.websocket === ws));
    ws.send(JSON.stringify({ type: ACTIONS.CLIENT_UPDATE_STORE, store: {...serverStore, players: mappedPlayers, currentPlayer: stripWebSocket(currentPlayer)}}));
    if (message) {
      ws.send(JSON.stringify({ type: ACTIONS.CLIENT_TOAST_MESSAGE, message }));
    }
  });
};

setInterval(() => {
  wss.clients.forEach(ws => {
    if (!ws.isAlive) {
      const disconnectedPlayer = serverStore.players.find(player => player.websocket === ws);
      ws.terminate();
      disconnectedPlayer.ws = null;
      updatePlayersState(`${disconnectedPlayer.name} has disconnected`);
      return;
    }
    
    ws.isAlive = false;
    ws.ping(null, false, true);
  });
}, 10000);

server.listen(process.env.PORT || 8080, () => {
  console.log(`Server started on port ${server.address().port}`);
});
