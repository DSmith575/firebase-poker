export const pokerHands = [
  {
    name: 'Royal Flush',
    cards: [
      { suit: 'Spade', rank: 'A' },
      { suit: 'Spade', rank: 'K' },
      { suit: 'Spade', rank: 'Q' },
      { suit: 'Spade', rank: 'J' },
      { suit: 'Spade', rank: '10' },
    ],
  },
  {
    name: 'Straight Flush',
    cards: [
      { suit: 'Heart', rank: '9' },
      { suit: 'Heart', rank: '8' },
      { suit: 'Heart', rank: '7' },
      { suit: 'Heart', rank: '6' },
      { suit: 'Heart', rank: '5' },
    ],
  },
  {
    name: 'Four of a Kind',
    cards: [
      { suit: 'Diamond', rank: '9' },
      { suit: 'Heart', rank: '9' },
      { suit: 'Club', rank: '9' },
      { suit: 'Spade', rank: '9' },
      { suit: 'Heart', rank: 'K' },
    ],
  },
  {
    name: 'Full House',
    cards: [
      { suit: 'Club', rank: 'Q' },
      { suit: 'Heart', rank: 'Q' },
      { suit: 'Spade', rank: 'Q' },
      { suit: 'Diamond', rank: '7' },
      { suit: 'Heart', rank: '7' },
    ],
  },
  {
    name: 'Flush',
    cards: [
      { suit: 'Diamond', rank: 'K' },
      { suit: 'Diamond', rank: '8' },
      { suit: 'Diamond', rank: '5' },
      { suit: 'Diamond', rank: '4' },
      { suit: 'Diamond', rank: '2' },
    ],
  },
  {
    name: 'Straight',
    cards: [
      { suit: 'Heart', rank: '10' },
      { suit: 'Diamond', rank: '9' },
      { suit: 'Spade', rank: '8' },
      { suit: 'Heart', rank: '7' },
      { suit: 'Club', rank: '6' },
    ],
  },
  {
    name: 'Three of a Kind',
    cards: [
      { suit: 'Spade', rank: 'A' },
      { suit: 'Heart', rank: 'A' },
      { suit: 'Club', rank: 'A' },
      { suit: 'Diamond', rank: 'K' },
      { suit: 'Spade', rank: '5' },
    ],
  },
  {
    name: 'Two Pair',
    cards: [
      { suit: 'Club', rank: 'K' },
      { suit: 'Diamond', rank: 'K' },
      { suit: 'Heart', rank: '8' },
      { suit: 'Spade', rank: '8' },
      { suit: 'Club', rank: '2' },
    ],
  },
  {
    name: 'One Pair',
    cards: [
      { suit: 'Heart', rank: 'J' },
      { suit: 'Diamond', rank: 'J' },
      { suit: 'Heart', rank: '10' },
      { suit: 'Spade', rank: '9' },
      { suit: 'Club', rank: '7' },
    ],
  },
];
