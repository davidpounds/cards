import SUITS from './suits';

export const CARD_STATUS = Object.freeze({
  IN_DECK: 'IN_DECK',
  IN_PLAYER_HAND: 'IN_PLAYER_HAND',
  IN_PLAY: 'IN_PLAY',
  PLAYED: 'PLAYED',
});

export default class PlayingCard {
  constructor(suit, value) {
    this.suit = suit;
    this.value = value;
    this.player = null;
    this.inPlay = false;
  }

  get name() {
    return CARD_NAME[this.value - 1];
  }

  get colour() {
    return [SUITS.DIAMONDS, SUITS.HEARTS].includes(this.suit) ? 'red' : 'black';
  }

  get status() {
    if (this.player === null && this.inPlay === false) return CARD_STATUS.IN_DECK;
    if (this.player !== null && this.inPlay === false) return CARD_STATUS.IN_PLAYER_HAND;
    if (this.player !== null && this.inPlay === true) return CARD_STATUS.IN_PLAY;
    if (this.player === null && this.inPlay === true) return CARD_STATUS.PLAYED;
    return null;
  }
};

const CARD_NAME = Object.freeze([
  'Ace',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'Jack',
  'Queen',
  'King',
]);