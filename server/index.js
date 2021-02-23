const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');
const bodyParser = require('body-parser');
const { uid } = require('uid/single');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '..', 'build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const players = [1, 2, 3, 4].map(i => ({
  id: uid(16),
  name: `Player ${i}`,
  dealer: false,
}));

const dealer = {
  id: uid(16),
  name: 'Dealer',
  dealer: true,
};

const connectedUsers = new Map();

wss.on('connection', ws => {

  const noOfConnectedUsers = connectedUsers.size;
  if (noOfConnectedUsers > 5) {
    ws.terminate();
    return false;
  }

  if (noOfConnectedUsers === 0) {
    connectedUsers.set(ws, dealer);
  } else {
    connectedUsers.set(ws, players[noOfConnectedUsers - 1]);
  }

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
  ws.send(JSON.stringify({message: 'Connected to websocket', user: connectedUsers.get(ws)}));
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
