import './GameControls.css';
import * as ACTIONS from '../store/actiontypes.js';

const GameControls = props => {

  const { store, sendToServer } = props;
  const { currentPlayer } = store;
  const { isDealer = false } = currentPlayer ?? {};

  const dealHandler = () => {
    sendToServer(ACTIONS.SERVER_DEAL_HAND);
  };

  return <div className="game-controls">
    {isDealer && <button onClick={dealHandler} title="Reset and deal hand">
      <svg><use href="#reset" /></svg>
    </button>}
  </div>;
}

export default GameControls;
