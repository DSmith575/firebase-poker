import { leaveGame } from '../../firestore/firestoreFunctions';

jest.mock('../../firestore/firestoreFunctions', () => ({
  leaveGame: jest.fn(),
}));

const data = {
  playerId: 'testId',
  gameId: 'testGame',
};

describe('leaveGame', () => {
  test('should leave a game', async () => {
    leaveGame.mockResolvedValue(data);
    const result = await leaveGame(data.playerId, data.gameId);
    expect(result).toBe(data);
  });

  test('should return an error', async () => {
    const errorMessage = 'Failed to add document';
    const error = new Error(errorMessage);
    leaveGame.mockRejectedValue(error);
    try {
      await leaveGame(data.playerId, data.gameId);
    } catch (error) {
      expect(error.message).toEqual(errorMessage);
    }
  });
});
