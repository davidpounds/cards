import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as ACTIONS from './store/actiontypes.js';
import App from './App.js';

const storedPlayerId = localStorage.getItem('playerId');
const webSocket = new WebSocket(`ws://localhost:8080/?playerId=${storedPlayerId}`);

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
    const { store } = data;
    const { currentPlayer = null } = store;
    if (storedPlayerId !== currentPlayer?.id && (currentPlayer?.id ?? null) !== null) {
      localStorage.setItem('playerId', currentPlayer.id);
    }
    window.dispatchEvent(new CustomEvent(ACTIONS.CLIENT_UPDATE_STORE, { detail: store }));
  }
  catch (err) {
    console.log('web socket data error', e, err);
  }
};

webSocket.onopen = onOpenHandler;
webSocket.onclose = onCloseHandler;
webSocket.onerror = onErrorHandler;
webSocket.onmessage = onMessageHandler;

ReactDOM.render(
  <React.StrictMode>
    <App sendToServer={sendToServer} />
  </React.StrictMode>,
  document.getElementById('root')
);
