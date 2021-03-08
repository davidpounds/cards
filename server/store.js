import CONFIG from '../src/data/config.js';
import getResetDeck from '../src/data/deck.js';
import { shuffleDeck } from '../src/data/randomizing.js';

const serverStore = {
  users: [],
  players: [],
  deck: shuffleDeck(getResetDeck()),
  currentUser: null,
};

// const getUserIdForWebsocket = ws => {
//   const user = serverStore.users.find(user => user.websocket === ws);
//   return user ? user.id : null;
// };

export const resetShuffleAndDeal = (resetPlayers = false) => {
  const shuffledResetDeck = shuffleDeck(getResetDeck());
  const { players } = serverStore;
  const numberOfPlayers = players.length;
  if (numberOfPlayers === CONFIG.MAX_PLAYERS) {
    const numberOfCards = Math.floor(CONFIG.CARDS_IN_DECK / numberOfPlayers);
    const numberOfCardsToDeal = numberOfCards * numberOfPlayers;
    [...new Array(numberOfCardsToDeal).keys()].forEach(i => {
      const playerIndex = Math.floor(i / numberOfCards);
      shuffledResetDeck[i].player = players[playerIndex];
    });
  }
  serverStore.deck = shuffledResetDeck;
  if (resetPlayers) {
    serverStore.players = [];
  }
};

export default serverStore;
