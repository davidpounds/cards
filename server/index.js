import express from 'express';
import http from 'http';
import WebSocket from 'ws';
import path from 'path';
import bodyParser from 'body-parser';
import serverStore, { resetShuffleAndDeal } from './store.js';
import { connectionHandler } from './websocketevents.js';

const __dirname = path.resolve();
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '..', 'build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
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

export const updatePlayersState = () => {
  const { players } = serverStore;
  const mappedPlayers = players.map(player => stripWebSocket(player));
  wss.clients.forEach(ws => {
    const currentPlayer = stripWebSocket(players.find(player => player.websocket === ws));
    ws.send(JSON.stringify({ store: {...serverStore, players: mappedPlayers, currentPlayer}}));
  });
};

setInterval(() => {
  wss.clients.forEach(ws => {
    if (!ws.isAlive) {
      const disconnectedPlayer = serverStore.players.find(player => player.websocket === ws);
      ws.terminate();
      disconnectedPlayer.ws = null;
      updatePlayersState();
      return;
    }
    
    ws.isAlive = false;
    ws.ping(null, false, true);
  });
}, 10000);

console.log(serverStore.players);

server.listen(process.env.PORT || 8080, () => {
  console.log(`Server started on port ${server.address().port}`);
});
