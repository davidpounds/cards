import { useState } from 'react';
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
  const { players = [], users = [], scores = [], currentUser = null } = store;
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

  const resetScores = () => {
    sendToServer(ACTIONS.SERVER_UPDATE_PLAYER_SCORE, { resetAll: true });
  };

  return <div className="connected-users">
    {isDealer && <div className="reset-scores">
      <button className="form-control" onClick={resetScores}>Reset scores</button>
    </div>}
    <table>
      <thead>
        <tr>
          <th>Name</th>
          {isDealer && <th>Role</th>}
          <th>Score</th>
          {isDealer && <th>Add</th>}
        </tr>
      </thead>
      <tbody>
        {users.map(user => <UserRow
          players={players} 
          scores={scores}
          users={users} 
          user={user} 
          isDealer={isDealer} 
          currentUser={currentUser} 
          unassignedPlayers={unassignedPlayers}
          sendToServer={sendToServer}
          playersFull={playersFull}
          changeHandler={assignPlayerHandler(user)}
        />)}
      </tbody>
    </table>
  </div>;
}

const UserRow = props => {
  const { players, users, user, isDealer, currentUser, unassignedPlayers, sendToServer, playersFull, scores, changeHandler } = props;
  const playerIdForUser = getPlayerIdForUserId(players, users, user.id) ?? '';
  const playerScore = scores.find(score => score.playerId === playerIdForUser)?.score ?? 0;
  const isPlayer = !isDealer && playerIdForUser !== null;
  const isCurrentUser = user.id === currentUser?.id;
  const showButtons = !user.isDealer && isDealer;
  const availablePlayers = uniqueArray([playerIdForUser, ...unassignedPlayers]).filter(ap => !!ap).sort((a, b) => {
    const ai = getPlayerIndex(players, a);
    const bi = getPlayerIndex(players, b);
    return ai - bi;
  });
  const [valueToAdd, setValueToAdd] = useState(0);
  const valueToAddChangeHandler = e => {
    const value = Number.parseInt(e.target.value, 10);
    if (!Number.isNaN(value)) {
      setValueToAdd(value);
    }
  };

  const updateScoreHandler = () => {
    const value = Number.parseInt(valueToAdd, 10);
    if (!Number.isNaN(value)) {
      sendToServer(ACTIONS.SERVER_UPDATE_PLAYER_SCORE, { playerId: playerIdForUser, score: playerScore + value });
    }
    setValueToAdd(0);
  };

  return <tr key={user.id}>
    <td>
      <UserName name={user.name} editable={isCurrentUser && !isDealer} sendToServer={sendToServer} />
    </td>
    {isDealer && (
      <td className="role">
        {showButtons && !isPlayer && !playersFull && (
          <PlayerPicker availablePlayers={availablePlayers} players={players} playerId={playerIdForUser} onChange={changeHandler} />
        )}
      </td>
    )}
    <td className="score">
      {!user.isDealer && playerIdForUser && <>{playerScore}</>}
    </td>
    {isDealer && (
      <td className="score">
        {!user.isDealer && playerIdForUser && (
          <input 
            className="form-control" 
            type="number" 
            value="0" 
            min="0" 
            max="99" 
            step="1" 
            maxlength="2" 
            size="2" 
            aria-label="Score to add"
            value={valueToAdd}
            onChange={valueToAddChangeHandler}
            onBlur={updateScoreHandler}
          />
        )}
      </td>
    )}
  </tr>;

};

const PlayerPicker = props => {
  const { availablePlayers, players, onChange, playerId } = props;
  return <select className="form-control" onChange={onChange} value={playerId}>
    <option value="">Spectator</option>
    {availablePlayers.map(player => (
      <option
        value={player}
        key={player}
      >Player {getPlayerIndex(players, player) + 1}</option>
    ))}
  </select>;
};

export default ConnectedUsers;
