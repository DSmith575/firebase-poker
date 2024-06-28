import { createDeck } from '../../utils/poker/createDeck';

describe('createDeck', () => {
  test('should create a deck with 52 cards', () => {
    const deck = createDeck();
    expect(deck.length).toBe(52);
  });

  test('should create a deck with correct card properties', () => {
    const deck = createDeck();
    deck.forEach((card) => {
      expect(card).toHaveProperty('suit');
      expect(card).toHaveProperty('rank');
    });
  });

  test('should create a deck with unique cards', () => {
    const deck = createDeck();
    const uniqueCards = new Set(deck);
    expect(uniqueCards.size).toBe(52);
  });

  test('should create a deck with correct card values', () => {
    const deck = createDeck();
    const cardSuits = deck.map((card) => card.rank.label);
    const expectedSuits = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    expect(cardSuits).toEqual(expect.arrayContaining(expectedSuits));
  });

  test('should create a deck with correct card suits', () => {
    const deck = createDeck();
    const cardSuits = deck.map((card) => card.suit);
    const expectedSuits = ['Heart', 'Club', 'Diamond', 'Heart'];
    expect(cardSuits).toEqual(expect.arrayContaining(expectedSuits));
  });
});
