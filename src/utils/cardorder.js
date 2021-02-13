import { SUIT } from '../data/deck';

export const shuffleDeck = deck => [...deck].sort((a, b) => Math.random() - 0.5);

const suitSortOrder = [SUIT.SPADES, SUIT.DIAMONDS, SUIT.CLUBS, SUIT.HEARTS];

export const sortHand = hand => [...hand].sort((a, b) => {
  const suitSort = suitSortOrder.indexOf(a.suit) - suitSortOrder.indexOf(b.suit);
  if (suitSort !== 0) return suitSort;
  return a.value - b.value;
});

export const dealHand = (deck, numberOfCards) => {
  const newDeck = [...deck];
  const hand = newDeck.length < numberOfCards 
    ? null 
    : newDeck.splice(0, numberOfCards);
  return {
    hand,
    newDeck,
  }
};
