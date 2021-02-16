import PlayingCard from './PlayingCard.class';
import SUIT from './suits';

const values = [...Array(13).keys()];
const suits = Object.values(SUIT);

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
