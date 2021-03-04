import SUITS from './suits.js';

const getSuit = bitmask => SUITS.get(bitmask & 0xf0);

const getSuitSymbol = bitmask => {
  const suit = getSuit(bitmask);
  return {
    Spades: '♠',
    Diamonds: '♦',
    Clubs: '♣',
    Hearts: '♥',
  }[suit];
};

const getSuitColour = bitmask => (bitmask & 0xa0) ? 'red' : 'black';

const getName = (bitmask, short = false) => {
  const cardNames = new Map([
    [1, 'Ace'],
    [11, 'Jack'],
    [12, 'Queen'],
    [13, 'King'],
  ]);
  const value = bitmask & 0x0f;
  const cardName = cardNames.get(value);
  if (cardName) {
    return short ? cardName.substr(0, 1) : cardName;
  }
  return String(value);
};

export const getFullCardName = bitmask => `${getName(bitmask)} of ${getSuit(bitmask)}`;

export const getShortCardInfo = bitmask => ({
  symbol: getSuitSymbol(bitmask),
  colour: getSuitColour(bitmask),
  value: getName(bitmask, true),
});

export default class PlayingCard {
  constructor(bitmask) {
    this.bitmask = bitmask;
    this.player = null;
    this.inPlay = null;
    this.played = false;
  }
};
