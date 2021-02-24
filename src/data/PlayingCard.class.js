import SUITS from './suits.js';

export const CARD_STATUS = Object.freeze({
  IN_DECK: 'IN_DECK',
  IN_PLAYER_HAND: 'IN_PLAYER_HAND',
  IN_PLAY: 'IN_PLAY',
  PLAYED: 'PLAYED',
});

export default class PlayingCard {
  constructor(bitmask) {
    this.bitmask = bitmask;
    this.player = null;
    this.inPlay = false;
  }

  get suit() {
    return SUITS.get(this.bitmask & 0xf0);
  }
  
  get value() {
    return this.bitmask & 0x0f;
  }

  get colour() {
    return this.bitmask & 0x50 ? 'black' : 'red';
  }

  get name() {
    const cardNames = new Map([
      [1, 'Ace'],
      [11, 'Jack'],
      [12, 'Queen'],
      [13, 'King'],
    ]);
    return cardNames.get(this.value) ?? String(this.value);
  }

  get status() {
    if (this.player === null && this.inPlay === false) return CARD_STATUS.IN_DECK;
    if (this.player !== null && this.inPlay === false) return CARD_STATUS.IN_PLAYER_HAND;
    if (this.player !== null && this.inPlay === true) return CARD_STATUS.IN_PLAY;
    if (this.player === null && this.inPlay === true) return CARD_STATUS.PLAYED;
    return null;
  }
};
