import './GameControls.css';
import * as ACTIONS from '../store/actiontypes.js';

const GameControls = props => {

  const { store, sendToServer } = props;
  const { currentPlayer } = store;
  const { name, id, isDealer = false } = currentPlayer ?? {};

  const dealHandler = () => {
    sendToServer(ACTIONS.DEAL_HAND);
  };

  return <div className="game-controls">
    <p>You are {name} [{id}]</p>
    {isDealer && <button onClick={dealHandler} title="Reset and deal hand">
      <svg><use href="#reset" /></svg>
    </button>}
  </div>;
}

export default GameControls;
