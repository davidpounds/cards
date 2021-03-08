import CONFIG from '../src/data/config.js';
import getResetDeck from '../src/data/deck.js';
import { shuffleDeck } from '../src/data/randomizing.js';
import { uid } from 'uid/single';

const serverStore = {
  users: [],
  players: [],
  deck: shuffleDeck(getResetDeck()),
  currentUser: null,
};

const getUserIdForWebsocket = ws => {
  const user = serverStore.users.find(user => user.websocket === ws);
  return user ? user.id : null;
};

export const resetShuffleAndDeal = (resetPlayers = false) => {
  const shuffledResetDeck = shuffleDeck(getResetDeck());
  const { players } = serverStore;
  const numberOfPlayers = players.length; // TODO - need to check that players have been allocated
  if (numberOfPlayers === CONFIG.MAX_PLAYERS) {
    const numberOfCards = Math.floor(CONFIG.CARDS_IN_DECK / numberOfPlayers);
    const numberOfCardsToDeal = numberOfCards * numberOfPlayers;
    [...new Array(numberOfCardsToDeal).keys()].forEach(i => {
      const playerIndex = Math.floor(i / numberOfCards);
      shuffledResetDeck[i].player = players[playerIndex].id;
    });
  }
  serverStore.deck = shuffledResetDeck;
  if (resetPlayers) { // TODO - disconnect websocket and reset user.
    serverStore.players.forEach(player => {
      player.id = uid(16);
      player.websocket = null;
    });
  }
};

export default serverStore;
