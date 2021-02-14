import SUIT from './suits';

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
    return [SUIT.DIAMONDS, SUIT.HEARTS].includes(this.suit) ? 'red' : 'black';
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