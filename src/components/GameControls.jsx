import './GameControls.css';
import * as ACTIONS from '../store/actiontypes.js';
import CONFIG from '../data/config.js';

const GameControls = props => {

  const { store, sendToServer } = props;
  const { currentUser, players } = store;
  const { isDealer = false } = currentUser ?? {};

  const dealHandler = () => {
    sendToServer(ACTIONS.SERVER_DEAL_HAND);
  };

  const resetHandler = () => {
    sendToServer(ACTIONS.SERVER_RESET_GAME);
  };

  const playerCount = players.length;
  const allPlayers = playerCount === CONFIG.MAX_PLAYERS;

  return <div className="game-controls">
    {isDealer && <>
      <button onClick={dealHandler} title="Reset and deal hand" disabled={!allPlayers}>
        <svg><use href="#reset" /></svg>
      </button>
      <button onClick={resetHandler} title="Reset players">
        <svg><use href="#power" /></svg>
      </button>
    </>}
  </div>;
}

export default GameControls;
