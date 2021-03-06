import './PlayerName.css';
import { useState } from 'react';
import * as ACTIONS from '../store/actiontypes.js';

const PlayerName = props => {
  const { name, editable = false, sendToServer } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(name);
  const startEditHandler = () => {
    setIsEditing(editable);
  };
  const cancelEditHandler = () => {
    setIsEditing(false);
  };
  const saveEditHandler = () => {
    sendToServer(ACTIONS.SERVER_CHANGE_PLAYER_NAME, {name: playerName});
    setIsEditing(false);
  };
  const playerNameChangeHandler = e => {
    setPlayerName(e.target.value);
  };

  return <span className="name">
    {!isEditing && name}
    {editable && !isEditing && (
      <button className="btn-icon edit" onClick={startEditHandler} title="Edit">
        <svg><use href="#pencil" /></svg>
      </button>
    )}
    {editable && isEditing && <>
      <input type="text" value={playerName} maxlength="32" onChange={playerNameChangeHandler} />
      <button className="btn-icon save" onClick={saveEditHandler} title="Save">
        <svg><use href="#tick" /></svg>
      </button>
      <button className="btn-icon cancel" onClick={cancelEditHandler} title="Cancel">
        <svg><use href="#cross" /></svg>
      </button>
    </>}
  </span>;
};

export default PlayerName;
