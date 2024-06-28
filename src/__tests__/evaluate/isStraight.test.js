import { isStraight } from '../../utils/poker/evaluateHands';

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
});
