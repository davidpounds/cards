import { uid } from 'uid/single';

export default class User {
  constructor(websocket = null, id, name, isDealer = false) {
    this.websocket = websocket;
    this.id = id || uid(16);
    this.name = name || 'Anonymous';
    this.isDealer = isDealer;
  }

  get isConnected() {
    return this.websocket !== null;
  }

  static withoutWebSocket(user) {
    if (!user) return null;
    const { websocket, ...strippedUser } = user;
    return {...strippedUser, isConnected: this.isConnected};
  };

}
