import CONFIG from '../src/data/config.js';
import getResetDeck from '../src/data/deck.js';
import { shuffleDeck, getNewPlayers } from '../src/data/randomizing.js';

const serverStore = {
  users: [],
  players: getNewPlayers(CONFIG.MAX_PLAYERS),
  deck: shuffleDeck(getResetDeck()),
  currentUser: null,
  scores: [],
};

export const resetScores = () => {
  serverStore.scores = serverStore.players.map(player => ({
    playerId: player,
    score: 0,
  }));
};

resetScores();

export const resetShuffleAndDeal = (resetPlayers = false) => {
  const shuffledResetDeck = shuffleDeck(getResetDeck());
  const { players } = serverStore;
  const numberOfPlayers = players.length;
  if (resetPlayers) {
    serverStore.players = getNewPlayers(CONFIG.MAX_PLAYERS);
    resetScores();
  }
  if (numberOfPlayers === CONFIG.MAX_PLAYERS) {
    const numberOfCards = Math.floor(CONFIG.CARDS_IN_DECK / numberOfPlayers);
    const numberOfCardsToDeal = numberOfCards * numberOfPlayers;
    [...new Array(numberOfCardsToDeal).keys()].forEach(i => {
      const playerIndex = Math.floor(i / numberOfCards);
      shuffledResetDeck[i].player = players[playerIndex];
    });
  }
  serverStore.deck = shuffledResetDeck;
};

export default serverStore;
