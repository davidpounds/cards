import React from 'react';
import ReactDOM from 'react-dom';
import { Toast } from 'toaster-js';
import 'toaster-js/default.css';
import './index.css';
import * as ACTIONS from './store/actiontypes.js';
import CONFIG from './data/config.js';
import App from './App.js';

let storedUserId = localStorage.getItem(CONFIG.USER_ID_KEY);
const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
const hostname = window.location.hostname;
const port = window.location.port === '3000' ? '8080' : window.location.port;
const wsUrl = `${protocol}://${hostname}:${port}/?${CONFIG.USER_ID_KEY}=${storedUserId}`;
const webSocket = new WebSocket(wsUrl);

const sendToServer = (type, data) => {
  webSocket.send(JSON.stringify({ type, data }));
};

const onOpenHandler = () => {
  console.log('web socket opened');
};

const onCloseHandler = () => {
  console.log('web socket closed');
};

const onErrorHandler = e => {
  console.log('web socket error', e);    
};

const onMessageHandler = e => {
  try {
    const data = JSON.parse(e.data);
    const { type, store, message } = data;
    switch (type) {
      case ACTIONS.CLIENT_UPDATE_STORE:
        const { currentPlayer = null } = store;
        if (storedUserId !== currentPlayer?.id && (currentPlayer?.id ?? null) !== null) {
          storedUserId = currentPlayer.id;
          localStorage.setItem(CONFIG.USER_ID_KEY, storedUserId);
          new Toast(`You are ${currentPlayer.name}`, Toast.TYPE_INFO, Toast.TIME_LONG);
        }
        window.dispatchEvent(new CustomEvent(ACTIONS.CLIENT_UPDATE_STORE, { detail: store }));
        break;
      case ACTIONS.CLIENT_TOAST_MESSAGE:
        new Toast(message, Toast.TYPE_INFO, Toast.TIME_LONG);
        break;
      default:
        break;
    }
  }
  catch (err) {
    console.log('web socket data error', e, err);
  }
};

webSocket.onopen = onOpenHandler;
webSocket.onclose = onCloseHandler;
webSocket.onerror = onErrorHandler;
webSocket.onmessage = onMessageHandler;

document.querySelector('body').style.cssText = `--card-width: ${CONFIG.CARD_WIDTH}; --card-height: ${CONFIG.CARD_HEIGHT}; --hand-width-multiplier: ${CONFIG.PLAYER_HAND_CARD_WIDTH_MULTIPLIER}`;

ReactDOM.render(
  <React.StrictMode>
    <App sendToServer={sendToServer} />
  </React.StrictMode>,
  document.getElementById('root')
);

new Toast('Welcome', Toast.TYPE_MESSAGE, Toast.TIME_NORMAL);