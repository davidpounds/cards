import './GameControls.css';
import * as ACTIONS from '../store/actiontypes.js';

const GameControls = props => {

  const { store, sendToServer } = props;
  const { currentUser, forceFollowSuit = false, forceClockwisePlay = false } = store;
  const { isDealer = false } = currentUser ?? {};

  const dealHandler = () => {
    sendToServer(ACTIONS.SERVER_DEAL_HAND);
  };

  const resetHandler = () => {
    sendToServer(ACTIONS.SERVER_RESET_GAME);
  };

  const updateForceFollowSuite = e => {
    const forceFollowSuit = e.target.checked;
    sendToServer(ACTIONS.SERVER_FORCE_FOLLOW_SUITE, { forceFollowSuit });
  };

  const updateForceClockwisePlay = e => {
    const forceClockwisePlay = e.target.checked;
    sendToServer(ACTIONS.SERVER_FORCE_CLOCKWISE_PLAY, { forceClockwisePlay });
  };

  return <div className="game-controls">
    {isDealer && <>
      <div>
        <button onClick={dealHandler} title="Reset and deal hand">
          <svg><use href="#reset" /></svg>
        </button>
        <button onClick={resetHandler} title="Reset players">
          <svg><use href="#power" /></svg>
        </button>
      </div>
      <div>
        <input type="checkbox" id="forceFollowSuit" checked={forceFollowSuit} value="1" onChange={updateForceFollowSuite} />
        <label for="forceFollowSuit">Must follow suit</label>
      </div>
      <div>
        <input type="checkbox" id="forceClockwisePlay" checked={forceClockwisePlay} value="1" onChange={updateForceClockwisePlay} />
        <label for="forceClockwisePlay">Clockwise play</label>
      </div>
    </>}
    {!isDealer && <>
      {forceFollowSuit && <div>You must follow suit if you are able to</div>}
      {!forceFollowSuit && <div>You do not need to follow suit</div>}
      {forceClockwisePlay && <div>You must play in a clockwise direction</div>}
      {!forceClockwisePlay && <div>You do not need to play in a clockwise direction</div>}
    </>}
  </div>;
}

export default GameControls;
