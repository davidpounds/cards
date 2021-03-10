import './ConnectedUsers.css';
import UserName from './UserName.jsx';
import * as ACTIONS from '../store/actiontypes.js';
import CONFIG from '../data/config.js';

const ConnectedUsers = props => {
  const { store, sendToServer } = props;
  const { players = [], users = [], currentUser = null } = store;
  const isDealer = currentUser?.isDealer ?? false;
  const playersFull = players.length >= CONFIG.MAX_PLAYERS;

  const addAsPlayerHandler = user => () => {
    sendToServer(ACTIONS.SERVER_ALLOCATE_USER_TO_PLAYER, user);
  };

  const removeAsPlayerHandler = user => () => {
    sendToServer(ACTIONS.SERVER_DEALLOCATE_USER_TO_PLAYER, user);
  };

  return <div className="connected-users">
    <ul>
      {users.map(user => {
        const isPlayer = players.includes(user.id);
        const isCurrentUser = user.id === currentUser.id;
        const showButtons = !user.isDealer && isDealer;
        return <li key={user.id}>
          <UserName name={user.name} editable={isCurrentUser && !isDealer} sendToServer={sendToServer} />
          {showButtons && !isPlayer && !playersFull && (
            <button onClick={addAsPlayerHandler(user)} className="btn-icon add" title="Add as player">
              <svg><use href="#cross" /></svg>
            </button>
          )}
          {showButtons && isPlayer && (
            <button onClick={removeAsPlayerHandler(user)} className="btn-icon remove" title="Remove as player">
              <svg><use href="#cross" /></svg>
            </button>
          )}
        </li>;
      })}
    </ul>
  </div>;
}

export default ConnectedUsers;
