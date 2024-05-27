/**
 * @jest-environment node
 */

import { createGame } from '../../firestore/firestoreFunctions';
import { describe, test, expect } from '@jest/globals';

jest.mock('../../firestore/firestoreFunctions', () => ({
  createGame: jest.fn(),
}));

const errorGameName = new Error('Game name must be at least 1 character long and not start with a space');
const errorUnauthenticated = new Error('Missing or insufficient permissions. Are you signed in?');

const gameInformation = {
  gameName: 'testGame',
  playerLength: 2,
  ownerId: 'testUser',
};

describe('createGame', () => {
  test('should return error if gameName is less than 1 character long', async () => {
    const { playerLength, ownerId } = gameInformation;
    createGame.mockRejectedValueOnce(errorGameName);
    try {
      await createGame('', playerLength, ownerId);
    } catch (error) {
      expect(error.message).toEqual(errorGameName.message);
    }
  });

  test('should return error if gameName starts with a space', async () => {
    const { playerLength, ownerId } = gameInformation;
    createGame.mockRejectedValueOnce(errorGameName);
    try {
      await createGame(' ', playerLength, ownerId);
    } catch (error) {
      expect(error.message).toEqual(errorGameName.message);
    }
  });

  test('should error if user is somehow not authenticated', async () => {
    const { gameName, playerLength } = gameInformation;
    createGame.mockRejectedValueOnce(errorUnauthenticated);
    try {
      await createGame(gameName, playerLength);
    } catch (error) {
      expect(error.message).toEqual(errorUnauthenticated.message);
    }
  });

  test('should call createGame with the correct arguments', async () => {
    createGame.mockResolvedValueOnce(gameInformation);
    const { gameName, playerLength, ownerId } = gameInformation;
    try {
      await createGame(gameName, playerLength, ownerId);
      expect(createGame).toHaveBeenCalledWith(gameName, playerLength, ownerId);
    } catch (error) {
      console.log(error);
    }
  });
});
