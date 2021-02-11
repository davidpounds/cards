const COLOUR = Object.freeze({
  RED: 'red',
  BLACK: 'black',
});

const SUIT = Object.freeze({
  HEARTS: 'Hearts',
  DIAMONDS: 'Diamonds',
  CLUBS: 'Clubs',
  SPADES: 'Spades',
});

const SUIT_SYMBOL = Object.freeze({
  HEARTS: '♥',
  DIAMONDS: '♦',
  CLUBS: '♣',
  SPADES: '♠',
});

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

const DECK = Object.freeze([
  // Hearts
  { colour: COLOUR.RED, suit: SUIT.HEARTS, symbol: SUIT_SYMBOL.HEARTS, value: 1, name: CARD_NAME[0] },
  { colour: COLOUR.RED, suit: SUIT.HEARTS, symbol: SUIT_SYMBOL.HEARTS, value: 2, name: CARD_NAME[1] },
  { colour: COLOUR.RED, suit: SUIT.HEARTS, symbol: SUIT_SYMBOL.HEARTS, value: 3, name: CARD_NAME[2] },
  { colour: COLOUR.RED, suit: SUIT.HEARTS, symbol: SUIT_SYMBOL.HEARTS, value: 4, name: CARD_NAME[3] },
  { colour: COLOUR.RED, suit: SUIT.HEARTS, symbol: SUIT_SYMBOL.HEARTS, value: 5, name: CARD_NAME[4] },
  { colour: COLOUR.RED, suit: SUIT.HEARTS, symbol: SUIT_SYMBOL.HEARTS, value: 6, name: CARD_NAME[5] },
  { colour: COLOUR.RED, suit: SUIT.HEARTS, symbol: SUIT_SYMBOL.HEARTS, value: 7, name: CARD_NAME[6] },
  { colour: COLOUR.RED, suit: SUIT.HEARTS, symbol: SUIT_SYMBOL.HEARTS, value: 8, name: CARD_NAME[7] },
  { colour: COLOUR.RED, suit: SUIT.HEARTS, symbol: SUIT_SYMBOL.HEARTS, value: 9, name: CARD_NAME[8] },
  { colour: COLOUR.RED, suit: SUIT.HEARTS, symbol: SUIT_SYMBOL.HEARTS, value: 10, name: CARD_NAME[9] },
  { colour: COLOUR.RED, suit: SUIT.HEARTS, symbol: SUIT_SYMBOL.HEARTS, value: 11, name: CARD_NAME[10] },
  { colour: COLOUR.RED, suit: SUIT.HEARTS, symbol: SUIT_SYMBOL.HEARTS, value: 12, name: CARD_NAME[11] },
  { colour: COLOUR.RED, suit: SUIT.HEARTS, symbol: SUIT_SYMBOL.HEARTS, value: 13, name: CARD_NAME[12] },

  // Diamonds
  { colour: COLOUR.RED, suit: SUIT.DIAMONDS, symbol: SUIT_SYMBOL.DIAMONDS, value: 1, name: CARD_NAME[0] },
  { colour: COLOUR.RED, suit: SUIT.DIAMONDS, symbol: SUIT_SYMBOL.DIAMONDS, value: 2, name: CARD_NAME[1] },
  { colour: COLOUR.RED, suit: SUIT.DIAMONDS, symbol: SUIT_SYMBOL.DIAMONDS, value: 3, name: CARD_NAME[2] },
  { colour: COLOUR.RED, suit: SUIT.DIAMONDS, symbol: SUIT_SYMBOL.DIAMONDS, value: 4, name: CARD_NAME[3] },
  { colour: COLOUR.RED, suit: SUIT.DIAMONDS, symbol: SUIT_SYMBOL.DIAMONDS, value: 5, name: CARD_NAME[4] },
  { colour: COLOUR.RED, suit: SUIT.DIAMONDS, symbol: SUIT_SYMBOL.DIAMONDS, value: 6, name: CARD_NAME[5] },
  { colour: COLOUR.RED, suit: SUIT.DIAMONDS, symbol: SUIT_SYMBOL.DIAMONDS, value: 7, name: CARD_NAME[6] },
  { colour: COLOUR.RED, suit: SUIT.DIAMONDS, symbol: SUIT_SYMBOL.DIAMONDS, value: 8, name: CARD_NAME[7] },
  { colour: COLOUR.RED, suit: SUIT.DIAMONDS, symbol: SUIT_SYMBOL.DIAMONDS, value: 9, name: CARD_NAME[8] },
  { colour: COLOUR.RED, suit: SUIT.DIAMONDS, symbol: SUIT_SYMBOL.DIAMONDS, value: 10, name: CARD_NAME[9] },
  { colour: COLOUR.RED, suit: SUIT.DIAMONDS, symbol: SUIT_SYMBOL.DIAMONDS, value: 11, name: CARD_NAME[10] },
  { colour: COLOUR.RED, suit: SUIT.DIAMONDS, symbol: SUIT_SYMBOL.DIAMONDS, value: 12, name: CARD_NAME[11] },
  { colour: COLOUR.RED, suit: SUIT.DIAMONDS, symbol: SUIT_SYMBOL.DIAMONDS, value: 13, name: CARD_NAME[12] },

  // Clubs
  { colour: COLOUR.BLACK, suit: SUIT.CLUBS, symbol: SUIT_SYMBOL.CLUBS, value: 1, name: CARD_NAME[0] },
  { colour: COLOUR.BLACK, suit: SUIT.CLUBS, symbol: SUIT_SYMBOL.CLUBS, value: 2, name: CARD_NAME[1] },
  { colour: COLOUR.BLACK, suit: SUIT.CLUBS, symbol: SUIT_SYMBOL.CLUBS, value: 3, name: CARD_NAME[2] },
  { colour: COLOUR.BLACK, suit: SUIT.CLUBS, symbol: SUIT_SYMBOL.CLUBS, value: 4, name: CARD_NAME[3] },
  { colour: COLOUR.BLACK, suit: SUIT.CLUBS, symbol: SUIT_SYMBOL.CLUBS, value: 5, name: CARD_NAME[4] },
  { colour: COLOUR.BLACK, suit: SUIT.CLUBS, symbol: SUIT_SYMBOL.CLUBS, value: 6, name: CARD_NAME[5] },
  { colour: COLOUR.BLACK, suit: SUIT.CLUBS, symbol: SUIT_SYMBOL.CLUBS, value: 7, name: CARD_NAME[6] },
  { colour: COLOUR.BLACK, suit: SUIT.CLUBS, symbol: SUIT_SYMBOL.CLUBS, value: 8, name: CARD_NAME[7] },
  { colour: COLOUR.BLACK, suit: SUIT.CLUBS, symbol: SUIT_SYMBOL.CLUBS, value: 9, name: CARD_NAME[8] },
  { colour: COLOUR.BLACK, suit: SUIT.CLUBS, symbol: SUIT_SYMBOL.CLUBS, value: 10, name: CARD_NAME[9] },
  { colour: COLOUR.BLACK, suit: SUIT.CLUBS, symbol: SUIT_SYMBOL.CLUBS, value: 11, name: CARD_NAME[10] },
  { colour: COLOUR.BLACK, suit: SUIT.CLUBS, symbol: SUIT_SYMBOL.CLUBS, value: 12, name: CARD_NAME[11] },
  { colour: COLOUR.BLACK, suit: SUIT.CLUBS, symbol: SUIT_SYMBOL.CLUBS, value: 13, name: CARD_NAME[12] },

  // Spades
  { colour: COLOUR.BLACK, suit: SUIT.SPADES, symbol: SUIT_SYMBOL.SPADES, value: 1, name: CARD_NAME[0] },
  { colour: COLOUR.BLACK, suit: SUIT.SPADES, symbol: SUIT_SYMBOL.SPADES, value: 2, name: CARD_NAME[1] },
  { colour: COLOUR.BLACK, suit: SUIT.SPADES, symbol: SUIT_SYMBOL.SPADES, value: 3, name: CARD_NAME[2] },
  { colour: COLOUR.BLACK, suit: SUIT.SPADES, symbol: SUIT_SYMBOL.SPADES, value: 4, name: CARD_NAME[3] },
  { colour: COLOUR.BLACK, suit: SUIT.SPADES, symbol: SUIT_SYMBOL.SPADES, value: 5, name: CARD_NAME[4] },
  { colour: COLOUR.BLACK, suit: SUIT.SPADES, symbol: SUIT_SYMBOL.SPADES, value: 6, name: CARD_NAME[5] },
  { colour: COLOUR.BLACK, suit: SUIT.SPADES, symbol: SUIT_SYMBOL.SPADES, value: 7, name: CARD_NAME[6] },
  { colour: COLOUR.BLACK, suit: SUIT.SPADES, symbol: SUIT_SYMBOL.SPADES, value: 8, name: CARD_NAME[7] },
  { colour: COLOUR.BLACK, suit: SUIT.SPADES, symbol: SUIT_SYMBOL.SPADES, value: 9, name: CARD_NAME[8] },
  { colour: COLOUR.BLACK, suit: SUIT.SPADES, symbol: SUIT_SYMBOL.SPADES, value: 10, name: CARD_NAME[9] },
  { colour: COLOUR.BLACK, suit: SUIT.SPADES, symbol: SUIT_SYMBOL.SPADES, value: 11, name: CARD_NAME[10] },
  { colour: COLOUR.BLACK, suit: SUIT.SPADES, symbol: SUIT_SYMBOL.SPADES, value: 12, name: CARD_NAME[11] },
  { colour: COLOUR.BLACK, suit: SUIT.SPADES, symbol: SUIT_SYMBOL.SPADES, value: 13, name: CARD_NAME[12] },
]);

export default DECK;
