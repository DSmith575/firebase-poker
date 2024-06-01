import { getGameList } from '../../firestore/firestoreFunctions';

jest.mock('../../firestore/firestoreFunctions', () => ({
  getGameList: jest.fn(),
}));

const data = {
  collectionName: 'games',
  callback: jest.fn(),
};

describe('getGameList', () => {
  test('should get a list of games', async () => {
    getGameList.mockResolvedValue(data);
    const result = await getGameList(data);
    expect(result).toBe(data);
  });

  test('should return an error', async () => {
    const errorMessage = 'Failed to get document';
    const error = new Error(errorMessage);
    getGameList.mockRejectedValue(error);
    try {
      await getGameList(data);
    } catch (error) {
      expect(error.message).toEqual(errorMessage);
    }
  });
});
