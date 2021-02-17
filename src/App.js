import './App.css';
import CONFIG from './data/config';
import GameControls from './components/GameControls';
import AvailableCards from './components/AvailableCards';
import Players from './components/Players';
import InPlay from './components/InPlay';
import PlayedCards from './components/PlayedCards';
import SvgInlineSprite from './components/SvgInline';

function App() {
  return (
    <main className="app" style={{ '--card-width': CONFIG.CARD_WIDTH, '--card-height': CONFIG.CARD_HEIGHT }}>
      <GameControls />
      <AvailableCards />
      <Players />
      <InPlay />
      <PlayedCards />
      <SvgInlineSprite />
    </main>
  );
}

export default App;
