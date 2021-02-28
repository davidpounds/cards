import './App.css';
import { useState, useEffect } from 'react';
import CONFIG from './data/config.js';
import * as ACTIONS from './store/actiontypes.js';
import GameControls from './components/GameControls.jsx';
import Players from './components/Players.jsx';
import InPlay from './components/InPlay.jsx';
import SvgInlineSprite from './components/SvgInline.jsx';

const App = props => {
  const {sendToServer} = props;

  const [store, setStore] = useState({
    players: [],
    deck: [],
    currentPlayer: null,
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
    <main className="app" style={{ '--card-width': CONFIG.CARD_WIDTH, '--card-height': CONFIG.CARD_HEIGHT, '--hand-width-multiplier': CONFIG.PLAYER_HAND_CARD_WIDTH_MULTIPLIER }}>
      <GameControls store={store} sendToServer={sendToServer} />
      <Players store={store} sendToServer={sendToServer} />
      <InPlay store={store} sendToServer={sendToServer} />
      <SvgInlineSprite />
    </main>
  );
}

export default App;
