// Mock Firestore and related functions
import { joinGame } from '../../firestore/firestoreFunctions';

jest.mock('../../firestore/firestoreFunctions', () => ({
  joinGame: jest.fn(),
}));

const data = {
  playerId: 'testId',
  gameId: 'testGame',
};

describe('joinGame', () => {
  test('should join a game', async () => {
    joinGame.mockResolvedValue(data);
    const result = await joinGame(data.playerId, data.gameId);
    expect(result).toBe(data);
  });

  test('should return an error', async () => {
    const errorMessage = 'Failed to add document';
    const error = new Error(errorMessage);
    joinGame.mockRejectedValue(error);
    try {
      await joinGame(data.playerId, data.gameId);
    } catch (error) {
      expect(error.message).toEqual(errorMessage);
    }
  });

  test('should return an error if game is full', async () => {
    const errorMessage = 'Game is full';
    const error = new Error(errorMessage);
    joinGame.mockRejectedValue(error);
    try {
      await joinGame(data.playerId, data.gameId);
    } catch (error) {
      expect(error.message).toEqual(errorMessage);
    }
  });
});
