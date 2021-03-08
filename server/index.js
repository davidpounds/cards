import express from 'express';
import http from 'http';
import WebSocket from 'ws';
import path from 'path';
import serverStore, { resetShuffleAndDeal } from './store.js';
import { connectionHandler } from './websocketevents.js';
import User from './User.class.js';
import * as ACTIONS from '../src/store/actiontypes.js';

const __dirname = path.resolve();
const devSeperator = !process.env.PORT ? '..' : '';
const app = express();
app.use(express.static(path.join(__dirname, devSeperator, 'build')));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, devSeperator, 'build', 'index.html'));
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server, clientTracking: true });

resetShuffleAndDeal();

wss.on('connection', (ws, req) => connectionHandler(ws, req, serverStore, wss.clients.size));

export const updateClientState = (message = null) => {
  const { users } = serverStore;
  const mappedUsers = users.map(user => User.withoutWebSocket(user));
  wss.clients.forEach(ws => {
    const currentUser = User.withoutWebSocket(users.find(user => user.websocket === ws));
    ws.send(JSON.stringify({ type: ACTIONS.CLIENT_UPDATE_STORE, store: {...serverStore, users: mappedUsers, currentUser}}));
    if (message) {
      ws.send(JSON.stringify({ type: ACTIONS.CLIENT_TOAST_MESSAGE, message }));
    }
  });
};

// export const disconnectAllUsers = () => {
//   wss.clients.forEach(ws => ws.terminate());
// };

setInterval(() => {
  wss.clients.forEach(ws => {
    if (!ws.isAlive) {
      const disconnectedUser = serverStore.users.find(user => user.websocket === ws);
      ws.terminate();
      disconnectedUser.ws = null;
      updateClientState(`${disconnectedUser.name} has disconnected`);
      return;
    }
    
    ws.isAlive = false;
    ws.ping(null, false, true);
  });
}, 10000);

server.listen(process.env.PORT || 8080, () => {
  console.log(`Server started on port ${server.address().port}`);
});
