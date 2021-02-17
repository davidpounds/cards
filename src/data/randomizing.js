export const randomNumberGenerator = (min, max) => {
  const difference = Number.parseInt(max) - Number.parseInt(min);
  return min + Math.round(Math.random() * difference);
};

export const shuffleDeck = deck => {
  const deckCopy = [...deck];
  const numberOfTimesToShuffle = randomNumberGenerator(10, 20);
  new Array(numberOfTimesToShuffle).fill().forEach(_ => {
    deckCopy.sort(() => randomNumberGenerator(-1, 1));
  });
  return deckCopy;
};
