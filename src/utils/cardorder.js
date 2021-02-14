import SUIT from '../data/suits';

export const shuffle = deck => [...deck].sort(() => Math.random() - 0.5);

const suitSortOrder = [SUIT.SPADES, SUIT.DIAMONDS, SUIT.CLUBS, SUIT.HEARTS];

export const unassignedCards = deck => deck.filter(card => card.player === null);

export const sortHand = hand => [...hand].sort((a, b) => {
  const suitSort = suitSortOrder.indexOf(a?.suit) - suitSortOrder.indexOf(b?.suit);
  if (suitSort !== 0) return suitSort;
  return (a?.value ?? 0) - (b?.value ?? 0);
});

export const dealHand = (deck, numberOfCards, player) => {
  console.log({ deck, numberOfCards, player });
  const availableCards = unassignedCards(deck);
  if (availableCards.length >= numberOfCards) {
    for (let i = 0; i < numberOfCards; i++) {
      availableCards[i].player = player;
    }
  }
  return deck;
};
