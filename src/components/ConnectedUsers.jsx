import './ConnectedUsers.css';
import UserName from './UserName.jsx';
import * as ACTIONS from '../store/actiontypes.js';
import CONFIG from '../data/config.js';
import { 
  getAllocatedPlayers, 
  getUnallocatedPlayers, 
  getPlayerIdForUserId, 
  getPlayerIndex, 
  uniqueArray, 
} from '../data/utils.js';

const ConnectedUsers = props => {
  const { store, sendToServer } = props;
  const { players = [], users = [], currentUser = null } = store;
  const isDealer = currentUser?.isDealer ?? false;
  const assignedPlayers = getAllocatedPlayers(players, users);
  const unassignedPlayers = getUnallocatedPlayers(players, users);
  const playersFull = assignedPlayers.length >= CONFIG.MAX_PLAYERS;

  const assignPlayerHandler = user => e => {
    const playerId = e.target.value;
    if (playerId === "") {
      sendToServer(ACTIONS.SERVER_DEALLOCATE_USER_TO_PLAYER, { user });
    } else {
      sendToServer(ACTIONS.SERVER_ALLOCATE_USER_TO_PLAYER, { user, playerId });
    }
  };

  return <div className="connected-users">
    <ul>
      {users.map(user => {
        const playerIdForUser = getPlayerIdForUserId(players, users, user.id) ?? '';
        const isPlayer = !isDealer && playerIdForUser !== null;
        const isCurrentUser = user.id === currentUser.id;
        const showButtons = !user.isDealer && isDealer;
        const availablePlayers = uniqueArray([playerIdForUser, ...unassignedPlayers]).filter(ap => !!ap).sort((a, b) => {
          const ai = getPlayerIndex(players, a);
          const bi = getPlayerIndex(players, b);
          return ai - bi;
        });

        return <li key={user.id}>
          <UserName name={user.name} editable={isCurrentUser && !isDealer} sendToServer={sendToServer} />
          {showButtons && !isPlayer && !playersFull && (
            <select onChange={assignPlayerHandler(user)} value={playerIdForUser}>
              <option value="">Spectator</option>
              {availablePlayers.map(player => (
                <option 
                  value={player} 
                  key={player}
                >Player {getPlayerIndex(players, player) + 1}</option>
              ))}
            </select>
          )}
        </li>;
      })}
    </ul>
  </div>;
}

export default ConnectedUsers;
