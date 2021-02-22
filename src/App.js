import './App.css';
import CONFIG from './data/config';
import GameControls from './components/GameControls';
// import AvailableCards from './components/AvailableCards';
// import PlayedCards from './components/PlayedCards';
import Players from './components/Players';
import InPlay from './components/InPlay';
import SvgInlineSprite from './components/SvgInline';

function App() {
  const currentPlayer = 'Player 4';
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
