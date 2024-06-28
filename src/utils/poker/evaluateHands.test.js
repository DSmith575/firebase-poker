import {
  isFlush,
  isStraight,
  evaluateFlush,
  evaluateStraight,
  isFullHouse,
  isMultiples,
  isTwoPair,
  isStraightFlush,
  isRoyalFlush,
  evaluateHand,
  evaluatePlayers,
  determineWinner,
  determineGameOutcome,
} from './evaluateHands';

describe('isFlush', () => {
  test('should return true if all cards have the same suit', () => {
    const hand = [
      { suit: 'Spades', rank: { value: 2 } },
      { suit: 'Spades', rank: { value: 5 } },
      { suit: 'Spades', rank: { value: 8 } },
      { suit: 'Spades', rank: { value: 10 } },
      { suit: 'Spades', rank: { value: 13 } },
    ];
    const result = isFlush(hand);
    expect(result).toBe(true);
  });

  test('should return false if not all cards have the same suit', () => {
    const hand = [
      { suit: 'Spades', rank: { value: 2 } },
      { suit: 'Spades', rank: { value: 5 } },
      { suit: 'Hearts', rank: { value: 8 } },
      { suit: 'Spades', rank: { value: 10 } },
      { suit: 'Spades', rank: { value: 13 } },
    ];
    const result = isFlush(hand);
    expect(result).toBe(false);
  });
});

// Add more test cases for other functions...
