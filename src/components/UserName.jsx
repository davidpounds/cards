import './UserName.css';
import { useState } from 'react';
import * as ACTIONS from '../store/actiontypes.js';

const UserName = props => {
  const { name, editable = false, sendToServer } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState(name);
  const startEditHandler = () => {
    setIsEditing(editable);
  };
  const cancelEditHandler = () => {
    setIsEditing(false);
  };
  const saveEditHandler = () => {
    sendToServer(ACTIONS.SERVER_CHANGE_USER_NAME, {name: userName});
    setIsEditing(false);
  };
  const userNameChangeHandler = e => {
    setUserName(e.target.value);
  };
  const keyDownHandler = e => {
    if (e.key === 'Enter') {
      saveEditHandler();
    }
  };

  return <span className="name">
    {!isEditing && name}
    {editable && !isEditing && (
      <button className="btn-icon edit" onClick={startEditHandler} title="Edit">
        <svg><use href="#pencil" /></svg>
      </button>
    )}
    {editable && isEditing && <>
      <input type="text" value={userName} maxLength="32" onKeyDown={keyDownHandler} onChange={userNameChangeHandler} />
      <button className="btn-icon save" onClick={saveEditHandler} title="Save">
        <svg><use href="#tick" /></svg>
      </button>
      <button className="btn-icon cancel" onClick={cancelEditHandler} title="Cancel">
        <svg><use href="#cross" /></svg>
      </button>
    </>}
  </span>;
};

export default UserName;
