import SUITS from './suits.js';

const getSuit = bitmask => SUITS.get(bitmask & 0xf0);

const getName = bitmask => {
  const cardNames = new Map([
    [1, 'Ace'],
    [11, 'Jack'],
    [12, 'Queen'],
    [13, 'King'],
  ]);
  const value = bitmask & 0x0f;
  return cardNames.get(value) ?? String(value);
};

export const getFullCardName = bitmask => `${getName(bitmask)} of ${getSuit(bitmask)}`;
export default class PlayingCard {
  constructor(bitmask) {
    this.bitmask = bitmask;
    this.player = null;
    this.inPlay = false;
    this.played = false;
  }
};
