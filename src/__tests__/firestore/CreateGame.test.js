/**
 * @jest-environment node
 */

import { createGame } from '../../firestore/firestoreFunctions';
import { describe, test, expect } from '@jest/globals';
import { initializeTestEnvironment, assertFails, assertSucceeds } from '@firebase/rules-unit-testing';
import { readFileSync } from 'node:fs';

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
  let testEnv;
  beforeAll(async () => {
    testEnv = await initializeTestEnvironment({
      projectId: 'adv-app-dev-assignment',
      firestore: {
        rules: readFileSync('firestore.rules', 'utf8'),
      },
      hub: {
        host: 'localhost',
        port: 4400,
      },
    });
  });

  test('should deny creating a game if the user is not authenticated', async () => {
    const unAuthUser = testEnv.unauthenticatedContext('unAuthUser').firestore();
    await assertFails(unAuthUser.collection('games').add({}));
  });

  test('should allow creating a game if user is authenticated', async () => {
    const authUser = testEnv.authenticatedContext('alice').firestore();
    await assertSucceeds(authUser.collection('games').add({}));
  });

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
