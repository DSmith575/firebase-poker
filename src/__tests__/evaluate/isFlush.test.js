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
} from '../../utils/poker/evaluateHands';

describe('isFlush', () => {
  test('should return true if all the cards are the same suit', () => {
    const hand = [
      { suit: 'hearts', rank: { value: 2 } },
      { suit: 'hearts', rank: { value: 3 } },
      { suit: 'hearts', rank: { value: 4 } },
      { suit: 'hearts', rank: { value: 5 } },
      { suit: 'hearts', rank: { value: 6 } },
    ];
    const result = isFlush(hand);
    expect(result).toBe(true);
  });

  test('should return false if the cards are not the same suit', () => {
    const hand = [
      { suit: 'hearts', rank: { value: 2 } },
      { suit: 'hearts', rank: { value: 3 } },
      { suit: 'hearts', rank: { value: 4 } },
      { suit: 'hearts', rank: { value: 5 } },
      { suit: 'clubs', rank: { value: 6 } },
    ];
    const result = isFlush(hand);
    expect(result).toBe(false);
  });
});

describe('isStraight', () => {
  test('should return true if the hand is a straight', () => {
    const hand = [
      { suit: 'hearts', rank: { value: 2 } },
      { suit: 'diamonds', rank: { value: 3 } },
      { suit: 'hearts', rank: { value: 4 } },
      { suit: 'clubs', rank: { value: 5 } },
      { suit: 'hearts', rank: { value: 6 } },
    ];
    const result = isStraight(hand);
    expect(result).toBe(true);
  });

  test('should return false if the hand is not a straight', () => {
    const hand = [
      { suit: 'hearts', rank: { value: 2 } },
      { suit: 'diamonds', rank: { value: 3 } },
      { suit: 'hearts', rank: { value: 4 } },
      { suit: 'clubs', rank: { value: 5 } },
      { suit: 'hearts', rank: { value: 7 } },
    ];
    const result = isStraight(hand);
    expect(result).toBe(false);
  });
});

describe('evaluateFlush', () => {
  test('should return the flush hand', () => {
    const hand = [
      { suit: 'hearts', rank: { value: 2 } },
      { suit: 'hearts', rank: { value: 3 } },
      { suit: 'hearts', rank: { value: 4 } },
      { suit: 'hearts', rank: { value: 5 } },
      { suit: 'hearts', rank: { value: 7 } },
    ];
    const result = evaluateFlush(hand);
    expect(result).toEqual({
      rank: 'Flush',
      value: 5,
      highCard: 7,
    });
  });

  test('should return false if the hand is not a flush', () => {
    const hand = [
      { suit: 'hearts', rank: { value: 2 } },
      { suit: 'diamonds', rank: { value: 3 } },
      { suit: 'hearts', rank: { value: 4 } },
      { suit: 'clubs', rank: { value: 5 } },
      { suit: 'hearts', rank: { value: 6 } },
    ];
    const result = evaluateFlush(hand);
    expect(result).toBe(false);
  });

  test('should return false if the hand is a straight', () => {
    const hand = [
      { suit: 'hearts', rank: { value: 2 } },
      { suit: 'diamonds', rank: { value: 3 } },
      { suit: 'hearts', rank: { value: 4 } },
      { suit: 'clubs', rank: { value: 5 } },
      { suit: 'hearts', rank: { value: 6 } },
    ];
    const result = evaluateFlush(hand);
    expect(result).toBe(false);
  });
});

describe('evaluateStraight', () => {
  test('should return the straight hand', () => {
    const hand = [
      { suit: 'hearts', rank: { value: 2 } },
      { suit: 'diamonds', rank: { value: 3 } },
      { suit: 'hearts', rank: { value: 4 } },
      { suit: 'clubs', rank: { value: 5 } },
      { suit: 'hearts', rank: { value: 6 } },
    ];
    const result = evaluateStraight(hand);
    expect(result).toEqual({
      rank: 'Straight',
      value: 6,
      highCard: 6,
    });
  });

  test('should return false if the hand is not a straight', () => {
    const hand = [
      { suit: 'hearts', rank: { value: 2 } },
      { suit: 'diamonds', rank: { value: 3 } },
      { suit: 'hearts', rank: { value: 4 } },
      { suit: 'clubs', rank: { value: 5 } },
      { suit: 'hearts', rank: { value: 7 } },
    ];
    const result = evaluateStraight(hand);
    expect(result).toBe(false);
  });
});

describe('isFullHouse', () => {
  test('should return the full house hand', () => {
    const hand = [
      { suit: 'hearts', rank: { value: 2 } },
      { suit: 'diamonds', rank: { value: 2 } },
      { suit: 'hearts', rank: { value: 2 } },
      { suit: 'clubs', rank: { value: 3 } },
      { suit: 'hearts', rank: { value: 3 } },
    ];
    const result = isFullHouse(hand);
    expect(result).toEqual({
      rank: 'Full House',
      value: 7,
      highCard: 2,
    });
  });

  test('should return false if the hand is not a full house', () => {
    const hand = [
      { suit: 'hearts', rank: { value: 2 } },
      { suit: 'diamonds', rank: { value: 2 } },
      { suit: 'hearts', rank: { value: 2 } },
      { suit: 'clubs', rank: { value: 3 } },
      { suit: 'hearts', rank: { value: 4 } },
    ];
    const result = isFullHouse(hand);
    expect(result).toBe(false);
  });

  test('should return false if the hand is a flush', () => {
    const hand = [
      { suit: 'hearts', rank: { value: 2 } },
      { suit: 'hearts', rank: { value: 3 } },
      { suit: 'hearts', rank: { value: 4 } },
      { suit: 'hearts', rank: { value: 5 } },
      { suit: 'hearts', rank: { value: 6 } },
    ];
    const result = isFullHouse(hand);
    expect(result).toBe(false);
  });

  test('should return false if the hand is a straight', () => {
    const hand = [
      { suit: 'hearts', rank: { value: 2 } },
      { suit: 'diamonds', rank: { value: 3 } },
      { suit: 'hearts', rank: { value: 4 } },
      { suit: 'clubs', rank: { value: 5 } },
      { suit: 'hearts', rank: { value: 6 } },
    ];
    const result = isFullHouse(hand);
    expect(result).toBe(false);
  });
});

describe('isMultiples', () => {
  test('should Three of a kind', () => {
    const hand = [
      { suit: 'hearts', rank: { value: 2 } },
      { suit: 'diamonds', rank: { value: 2 } },
      { suit: 'hearts', rank: { value: 2 } },
      { suit: 'clubs', rank: { value: 3 } },
      { suit: 'hearts', rank: { value: 4 } },
    ];
    const result = isMultiples(hand, 3);
    expect(result).toEqual({
      rank: 'Three of a Kind',
      value: 4,
      highCard: 4,
    });
  });

  test('should return Four of a kind', () => {
    const hand = [
      { suit: 'hearts', rank: { value: 2 } },
      { suit: 'diamonds', rank: { value: 2 } },
      { suit: 'hearts', rank: { value: 2 } },
      { suit: 'clubs', rank: { value: 2 } },
      { suit: 'hearts', rank: { value: 4 } },
    ];
    const result = isMultiples(hand, 4);
    expect(result).toEqual({
      rank: 'Four of a Kind',
      value: 8,
      highCard: 4,
    });
  });

  test('should return One pair', () => {
    const hand = [
      { suit: 'hearts', rank: { value: 2 } },
      { suit: 'diamonds', rank: { value: 2 } },
      { suit: 'hearts', rank: { value: 3 } },
      { suit: 'clubs', rank: { value: 3 } },
      { suit: 'hearts', rank: { value: 4 } },
    ];
    const result = isMultiples(hand, 2);
    expect(result).toEqual({
      rank: 'One Pair',
      value: 2,
      highCard: 4,
    });
  });

  test('should return false if the hand is not multiples', () => {
    const hand = [
      { suit: 'hearts', rank: { value: 2 } },
      { suit: 'diamonds', rank: { value: 2 } },
      { suit: 'hearts', rank: { value: 3 } },
      { suit: 'clubs', rank: { value: 3 } },
      { suit: 'hearts', rank: { value: 4 } },
    ];
    const result = isMultiples(hand, 3);
    expect(result).toBe(false);
  });
});

describe('isTwoPair', () => {
  test('should return the two pair hand', () => {
    const hand = [
      { suit: 'hearts', rank: { value: 2 } },
      { suit: 'diamonds', rank: { value: 2 } },
      { suit: 'hearts', rank: { value: 3 } },
      { suit: 'clubs', rank: { value: 3 } },
      { suit: 'hearts', rank: { value: 4 } },
    ];
    const result = isTwoPair(hand);
    expect(result).toEqual({
      rank: 'Two Pair',
      value: 3,
      highCard: 3,
    });
  });

  test('should return false if the hand is not two pair', () => {
    const hand = [
      { suit: 'hearts', rank: { value: 2 } },
      { suit: 'diamonds', rank: { value: 2 } },
      { suit: 'hearts', rank: { value: 3 } },
      { suit: 'clubs', rank: { value: 4 } },
      { suit: 'hearts', rank: { value: 5 } },
    ];
    const result = isTwoPair(hand);
    expect(result).toBe(false);
  });
});

describe('isStraightFlush', () => {
  test('should return the straight flush hand', () => {
    const hand = [
      { suit: 'hearts', rank: { value: 2 } },
      { suit: 'hearts', rank: { value: 3 } },
      { suit: 'hearts', rank: { value: 4 } },
      { suit: 'hearts', rank: { value: 5 } },
      { suit: 'hearts', rank: { value: 6 } },
    ];
    const result = isStraightFlush(hand);
    expect(result).toEqual({
      rank: 'Straight Flush',
      value: 9,
      highCard: 6,
    });
  });

  test('should return false if the hand is not a straight flush', () => {
    const hand = [
      { suit: 'hearts', rank: { value: 2 } },
      { suit: 'hearts', rank: { value: 3 } },
      { suit: 'hearts', rank: { value: 4 } },
      { suit: 'hearts', rank: { value: 5 } },
      { suit: 'hearts', rank: { value: 7 } },
    ];
    const result = isStraightFlush(hand);
    expect(result).toBe(false);
  });
});

describe('isRoyalFlush', () => {
  test('should return the royal flush hand', () => {
    const hand = [
      { suit: 'hearts', rank: { value: 10 } },
      { suit: 'hearts', rank: { value: 11 } },
      { suit: 'hearts', rank: { value: 12 } },
      { suit: 'hearts', rank: { value: 13 } },
      { suit: 'hearts', rank: { value: 14 } },
    ];
    const result = isRoyalFlush(hand);
    expect(result).toEqual({
      rank: 'Royal Flush',
      value: 10,
      highCard: 14,
    });
  });

  test('should return false if the hand is not a royal flush', () => {
    const hand = [
      { suit: 'hearts', rank: { value: 10 } },
      { suit: 'hearts', rank: { value: 11 } },
      { suit: 'hearts', rank: { value: 12 } },
      { suit: 'hearts', rank: { value: 13 } },
      { suit: 'hearts', rank: { value: 7 } },
    ];
    const result = isRoyalFlush(hand);
    expect(result).toBe(false);
  });
});

// test evaluateHand
describe('evaluateHand', () => {
  test('should return the royal flush hand', () => {
    const hand = [
      { suit: 'hearts', rank: { value: 10 } },
      { suit: 'hearts', rank: { value: 11 } },
      { suit: 'hearts', rank: { value: 12 } },
      { suit: 'hearts', rank: { value: 13 } },
      { suit: 'hearts', rank: { value: 14 } },
    ];
    const result = isRoyalFlush(hand);
    expect(result).toEqual({
      rank: 'Royal Flush',
      value: 10,
      highCard: 14,
    });
  });

  test('should return the straight flush hand', () => {
    const hand = [
      { suit: 'hearts', rank: { value: 2 } },
      { suit: 'hearts', rank: { value: 3 } },
      { suit: 'hearts', rank: { value: 4 } },
      { suit: 'hearts', rank: { value: 5 } },
      { suit: 'hearts', rank: { value: 6 } },
    ];

    const result = evaluateHand(hand);
    expect(result).toEqual({
      rank: 'Straight Flush',
      value: 9,
      highCard: 6,
    });
  });

  test('should return the four of a kind hand', () => {
    const hand = [
      { suit: 'hearts', rank: { value: 2 } },
      { suit: 'diamonds', rank: { value: 2 } },
      { suit: 'hearts', rank: { value: 2 } },
      { suit: 'clubs', rank: { value: 2 } },
      { suit: 'hearts', rank: { value: 4 } },
    ];
    const result = evaluateHand(hand);
    expect(result).toEqual({
      rank: 'Four of a Kind',
      value: 8,
      highCard: 4,
    });
  });

  test('should return the full house hand', () => {
    const hand = [
      { suit: 'hearts', rank: { value: 2 } },
      { suit: 'diamonds', rank: { value: 2 } },
      { suit: 'hearts', rank: { value: 2 } },
      { suit: 'clubs', rank: { value: 3 } },
      { suit: 'hearts', rank: { value: 3 } },
    ];
    const result = evaluateHand(hand);
    expect(result).toEqual({
      rank: 'Full House',
      value: 7,
      highCard: 2,
    });
  });

  test('should return the flush hand', () => {
    const hand = [
      { suit: 'hearts', rank: { value: 2 } },
      { suit: 'hearts', rank: { value: 3 } },
      { suit: 'hearts', rank: { value: 4 } },
      { suit: 'hearts', rank: { value: 5 } },
      { suit: 'hearts', rank: { value: 7 } },
    ];
    const result = evaluateHand(hand);
    expect(result).toEqual({
      rank: 'Flush',
      value: 5,
      highCard: 7,
    });
  });

  test('should return the straight hand', () => {
    const hand = [
      { suit: 'hearts', rank: { value: 2 } },
      { suit: 'diamonds', rank: { value: 3 } },
      { suit: 'hearts', rank: { value: 4 } },
      { suit: 'clubs', rank: { value: 5 } },
      { suit: 'hearts', rank: { value: 6 } },
    ];
    const result = evaluateHand(hand);
    expect(result).toEqual({
      rank: 'Straight',
      value: 6,
      highCard: 6,
    });
  });

  test('should return the three of a kind hand', () => {
    const hand = [
      { suit: 'hearts', rank: { value: 2 } },
      { suit: 'diamonds', rank: { value: 2 } },
      { suit: 'hearts', rank: { value: 2 } },
      { suit: 'clubs', rank: { value: 3 } },
      { suit: 'hearts', rank: { value: 4 } },
    ];
    const result = evaluateHand(hand);
    expect(result).toEqual({
      rank: 'Three of a Kind',
      value: 4,
      highCard: 4,
    });
  });

  test('should return the two pair hand', () => {
    const hand = [
      { suit: 'hearts', rank: { value: 2 } },
      { suit: 'diamonds', rank: { value: 2 } },
      { suit: 'hearts', rank: { value: 3 } },
      { suit: 'clubs', rank: { value: 3 } },
      { suit: 'hearts', rank: { value: 4 } },
    ];
    const result = evaluateHand(hand);
    expect(result).toEqual({
      rank: 'Two Pair',
      value: 3,
      highCard: 3,
    });
  });

  test('should return the one pair hand', () => {
    const hand = [
      { suit: 'hearts', rank: { value: 2 } },
      { suit: 'diamonds', rank: { value: 2 } },
      { suit: 'hearts', rank: { value: 3 } },
      { suit: 'clubs', rank: { value: 4 } },
      { suit: 'hearts', rank: { value: 5 } },
    ];
    const result = evaluateHand(hand);
    expect(result).toEqual({
      rank: 'One Pair',
      value: 2,
      highCard: 5,
    });
  });

  test('should return the high card hand', () => {
    const hand = [
      { suit: 'hearts', rank: { value: 2 } },
      { suit: 'diamonds', rank: { value: 10 } },
      { suit: 'hearts', rank: { value: 4 } },
      { suit: 'clubs', rank: { value: 5 } },
      { suit: 'hearts', rank: { value: 9 } },
    ];
    const result = evaluateHand(hand);
    expect(result).toEqual({
      rank: 'High Card',
      value: 1,
      highCard: 10,
    });
  });
});
