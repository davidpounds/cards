import './GameControls.css';
import * as ACTIONS from '../store/actiontypes.js';

const GameControls = props => {

  const { store, sendToServer } = props;
  const { currentUser, forceFollowSuit } = store;
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
        <label for="forceFollowSuit">Force users to follow suit if they are able to</label>
      </div>
    </>}
    {!isDealer && forceFollowSuit && <div>You must follow suit if you are able to</div>}
    {!isDealer && !forceFollowSuit && <div>You do not need to follow suit</div>}
  </div>;
}

export default GameControls;
