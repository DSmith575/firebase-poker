import { createDeck, shuffleDeck } from '../../utils/poker/createDeck';

describe('shuffleDeck()', () => {
  test('should shuffle the deck randomly', () => {
    const sortedDeck = createDeck();
    const shuffledDeck = shuffleDeck([...sortedDeck]);

    expect(shuffledDeck).toHaveLength(sortedDeck.length);
    expect(shuffledDeck).not.toEqual(sortedDeck);
  });

  test('should not modify the original deck', () => {
    const sortedDeck = createDeck();
    const shuffledDeck = shuffleDeck([...sortedDeck]);

    expect(shuffledDeck).toHaveLength(sortedDeck.length);
    expect(shuffledDeck).not.toEqual(sortedDeck);
  });

  test('should not shuffle the deck if only one card', () => {
    const deck = [{ suit: 'Heart', rank: { label: 'A', value: 14 } }];
    const shuffledDeck = shuffleDeck([...deck]);

    expect(shuffledDeck).toHaveLength(deck.length);
    expect(shuffledDeck).toEqual(deck);
  });

  test('should not shuffle the deck if no cards', () => {
    const deck = [];
    const shuffledDeck = shuffleDeck([...deck]);

    expect(shuffledDeck).toHaveLength(deck.length);
    expect(shuffledDeck).toEqual(deck);
  });
});
