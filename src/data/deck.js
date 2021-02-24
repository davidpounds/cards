import PlayingCard from './PlayingCard.class.js';
import SUITS from './suits.js';

const values = [...Array(13).keys()].map(i => i + 1);

const getResetDeck = () => {
  const deck = [];
  Array.from(SUITS.keys()).forEach(suit => {
    values.forEach(value => {
      deck.push(new PlayingCard(suit | value));
    });
  });
  return Object.freeze(deck);
};

export default getResetDeck;
