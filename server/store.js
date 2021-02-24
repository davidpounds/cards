import CONFIG from '../src/data/config.js';
import getResetDeck from '../src/data/deck.js';
import { shuffleDeck } from '../src/data/randomizing.js';
import { uid } from 'uid/single';

const serverStore = {
  players: [
    { 
      id: uid(16),
      name: 'Dealer',
      isDealer: true,
    },
    { 
      id: uid(16),
      name: 'Player 1',
      isDealer: false,
    },
    { 
      id: uid(16),
      name: 'Player 2',
      isDealer: false,
    },
    { 
      id: uid(16),
      name: 'Player 3',
      isDealer: false,
    },
    { 
      id: uid(16),
      name: 'Player 4',
      isDealer: false,
    },
  ],
  deck: shuffleDeck(getResetDeck()),
};

export const resetShuffleAndDeal = () => {
  const shuffledResetDeck = shuffleDeck(getResetDeck());
  const players = serverStore.players.filter(player => !player.isDealer);
  const numberOfPlayers = players.length;
  const numberOfCards = Math.floor(CONFIG.CARDS_IN_DECK / numberOfPlayers);
  const numberOfCardsToDeal = numberOfCards * numberOfPlayers;
  [...new Array(numberOfCardsToDeal).keys()].forEach(i => {
    const playerIndex = Math.floor(i / numberOfCards);
    shuffledResetDeck[i].player = players[playerIndex].id;
  });
  serverStore.deck = shuffledResetDeck;
};

export default serverStore;
