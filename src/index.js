import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/index.js';
import './index.css';
import App from './App.js';
import * as ACTIONS from './store/actiontypes.js';
import { updateStore } from './store/actions.js';

const webSocket = new WebSocket('ws://localhost:8080/');

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

const storedPlayerId = localStorage.getItem('playerId');

webSocket.onopen = (e) => {
  console.log('web socket opened');
  webSocket.send(JSON.stringify({type: ACTIONS.CONNECT_USER, data: { playerId: storedPlayerId}}));
};

webSocket.onclose = (e) => {
  console.log('web socket closed');
};

webSocket.onerror = (e) => {
  console.log('web socket error', e);
};

webSocket.onmessage = (e) => {
  try {
    const data = JSON.parse(e.data);
    console.log('web socket message', data);
    const { currentPlayer = null } = data;
    if (storedPlayerId !== currentPlayer?.id && (currentPlayer?.id ?? null) !== null) {
      localStorage.setItem('playerId', currentPlayer.id);
    }
    store.dispatch(updateStore(data.store));
  }
  catch (err) {
    console.log('web socket data error', e, err);
  }
}

window.setTimeout(() => {
  webSocket.send(JSON.stringify({ type: ACTIONS.CONNECT_USER, data: { playerId: storedPlayerId } }));
}, 1000);

window.setTimeout(() => {
  webSocket.send(JSON.stringify({ type: ACTIONS.ADD_CARD_TO_IN_PLAY, data: { cardBitmask: 17 } }));
}, 5000);

