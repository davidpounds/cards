import express from 'express';
import http from 'http';
import WebSocket from 'ws';
import path from 'path';
import bodyParser from 'body-parser';
import serverStore, { resetShuffleAndDeal } from './store.js';

const __dirname = path.resolve();
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '..', 'build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const [dealer, ...players] = serverStore.players;
resetShuffleAndDeal();

const connectedUsers = new Map();

wss.on('connection', ws => {

  const noOfConnectedUsers = connectedUsers.size;
  if (noOfConnectedUsers > serverStore.players.length) {
    ws.terminate();
    return false;
  }

  const currentPlayer = noOfConnectedUsers === 0 ? dealer : players[noOfConnectedUsers - 1];
  connectedUsers.set(ws, currentPlayer);
  
  ws.isAlive = true;

  ws.on('pong', () => {
    ws.isAlive = true;
  });

  ws.on('message', message => {
    console.log('Received: %s', message);
    let data;
    try {
      data = JSON.parse(message);
    }
    catch (err) {
      data = {
        error: true,
      };
    }
    if (!data.error) {
      if (data?.broadcast === true) {
        wss.clients.forEach(client => {
          if (client !== ws) {
            client.send(message);
          }
        });
      } else {
        ws.send(`You sent ${message}`);
      }
    } else {
      ws.send('Non-JSON string sent');
    }
  });
  ws.send(JSON.stringify({store: serverStore, currentPlayer}));
});

setInterval(() => {
  wss.clients.forEach(ws => {
    if (!ws.isAlive) {
      return ws.terminate();
    }
    
    ws.isAlive = false;
    ws.ping(null, false, true);
  });
}, 10000);

server.listen(process.env.PORT || 8080, () => {
  console.log(`Server started on port ${server.address().port}`);
});
