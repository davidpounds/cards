import './App.css';
import CONFIG from './data/config.js';
import GameControls from './components/GameControls.jsx';
// import AvailableCards from './components/AvailableCards.jsx';
// import PlayedCards from './components/PlayedCards.jsx';
import Players from './components/Players.jsx';
import InPlay from './components/InPlay.jsx';
import SvgInlineSprite from './components/SvgInline.jsx';

function App() {
  const currentPlayer = 'Admin';
  return (
    <main className="app" style={{ '--card-width': CONFIG.CARD_WIDTH, '--card-height': CONFIG.CARD_HEIGHT, '--hand-width-multiplier': CONFIG.PLAYER_HAND_CARD_WIDTH_MULTIPLIER }}>
      <GameControls />
      {/* <AvailableCards />
      <PlayedCards /> */}
      <Players currentPlayer={currentPlayer} />
      <InPlay currentPlayer={currentPlayer} />
      <SvgInlineSprite />
    </main>
  );
}

export default App;
