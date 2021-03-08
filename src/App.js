import './App.css';
import { useState, useEffect } from 'react';
import * as ACTIONS from './store/actiontypes.js';
import ConnectedUsers from './components/ConnectedUsers.jsx';
import GameControls from './components/GameControls.jsx';
import Players from './components/Players.jsx';
import InPlay from './components/InPlay.jsx';
import SvgInlineSprite from './components/SvgInline.jsx';

const App = props => {
  const {sendToServer} = props;

  const [store, setStore] = useState({
    users: [],
    players: [],
    deck: [],
    currentUser: null,
  });

  const updateStore = e => {
    setStore(e.detail);
  };

  useEffect(() => {
    window.addEventListener(ACTIONS.CLIENT_UPDATE_STORE, updateStore, false);
    return () => {
      window.removeEventListener(ACTIONS.CLIENT_UPDATE_STORE, updateStore, false);
    };
  });

  return (
    <main className="app">
      <ConnectedUsers store={store} sendToServer={sendToServer} />
      <GameControls store={store} sendToServer={sendToServer} />
      <InPlay store={store} sendToServer={sendToServer} />
      <Players store={store} sendToServer={sendToServer} />
      <SvgInlineSprite />
    </main>
  );
}

export default App;
