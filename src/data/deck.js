import PlayingCard from './PlayingCard.class';
import SUITS from './suits';

const values = [...Array(13).keys()];
const suits = Object.values(SUITS);

const getResetDeck = () => {
  const deck = [];
  suits.forEach(suit => {
    values.forEach(value => {
      deck.push(new PlayingCard(suit, value + 1));
    });
  });
  return Object.freeze(deck);
};

export default getResetDeck;
