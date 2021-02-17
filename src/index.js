import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

const webSocket = new WebSocket('ws://localhost:3000/');

webSocket.onopen = (e) => {
  console.log('web socket opened');
};

webSocket.onclose = (e) => {
  console.log('web socket closed');
};

webSocket.onerror = (e) => {
  console.log('web socket error', e);
};

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
