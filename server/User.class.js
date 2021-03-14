import { uid } from 'uid/single';

export default class User {
  constructor(websocket = null, id = null, playerId = null, name = null, isDealer = false) {
    this.websocket = websocket;
    this.id = id || uid(16);
    this.playerId = playerId;
    this.name = name || 'Anonymous';
    this.isDealer = isDealer;
  }

  static withoutWebSocket(user) {
    if (!user) return null;
    const { websocket, ...strippedUser } = user;
    return {...strippedUser, isConnected: this.websocket !== null};
  };
}
