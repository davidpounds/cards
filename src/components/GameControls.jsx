import './GameControls.css';
import * as ACTIONS from '../store/actiontypes.js';

const GameControls = props => {

  const { sendToServer } = props;

  const dealHandler = () => {
    sendToServer(ACTIONS.DEAL_HAND);
  };

  return <div className="game-controls">
    <button onClick={dealHandler} title="Reset and deal hand">
      <svg><use href="#reset" /></svg>
    </button>
  </div>;
}

export default GameControls;
