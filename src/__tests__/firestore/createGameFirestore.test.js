import { createGame } from '../../firestore/firestoreFunctions';

jest.mock('../../firestore/firestoreFunctions', () => ({
  createGame: jest.fn(),
}));

const data = {
  gameName: 'testGame',
  playerLength: 2,
  ownerId: 'testId',
};

describe('createGame', () => {
  test('should create a game', async () => {
    createGame.mockResolvedValue(data);
    const result = await createGame(data.gameName, data.playerLength, data.ownerId);
    expect(result).toBe(data);
  });

  test('should return an error', async () => {
    const errorMessage = 'Failed to add document';
    const error = new Error(errorMessage);
    createGame.mockRejectedValue(error);
    try {
      await createGame(data.gameName, data.playerLength, data.ownerId);
    } catch (error) {
      expect(error.message).toEqual(errorMessage);
    }
  });
});
