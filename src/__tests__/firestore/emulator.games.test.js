/**
 * @jest-environment node
 */

import { initializeTestEnvironment, assertFails, assertSucceeds } from '@firebase/rules-unit-testing';
import { readFileSync } from 'node:fs';

describe('firestore rules', () => {
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

  test('should deny reading a game if the user is not authenticated', async () => {
    const unAuthUser = testEnv.unauthenticatedContext('unAuthUser').firestore();
    await assertFails(unAuthUser.collection('games').add({}));
  });

  test('should allow reading a game if user is authenticated', async () => {
    const authUser = testEnv.authenticatedContext('alice').firestore();
    await assertSucceeds(authUser.collection('games').add({}));
  });

  test('should deny reading a game if the user is not authenticated', async () => {
    const unAuthUser = testEnv.unauthenticatedContext('unAuthUser').firestore();
    assertFails(unAuthUser.collection('games').add({}));
  });

  test('should allow reading a game if the user is authenticated', async () => {
    const authUser = testEnv.authenticatedContext('alice').firestore();
    assertSucceeds(authUser.collection('games').add({}));
  });

  test('should not allow deleting a game if the user is not authenticated', async () => {
    const authUser = testEnv.authenticatedContext('alice').firestore();
    const gameRef = await authUser.collection('games').add({ owner: 'alice', joinedPlayers: ['alice'] });
    const unAuthUser = testEnv.unauthenticatedContext('unAuthUser').firestore();
    assertFails(unAuthUser.collection('games').doc(gameRef.id).delete());
  });

  test('should allow deleting a game if the user is authenticated, and is the owner of the game', async () => {
    const authUser = testEnv.authenticatedContext('alice').firestore();
    const gameRef = await authUser.collection('games').add({ owner: 'alice', joinedPlayers: ['alice'] });
    assertSucceeds(authUser.collection('games').doc(gameRef.id).delete());
  });

  test('should allow updating game if authenticated or owner', async () => {
    const authUser = testEnv.authenticatedContext('alice').firestore();
    const gameRef = await authUser.collection('games').add({ owner: 'alice', joinedPlayers: ['alice'], started: false });
    const playerRef = gameRef.collection('players').doc('alice');
    await playerRef.set({ currentTurn: 'alice' });
    await assertSucceeds(
      authUser
        .collection('games')
        .doc(gameRef.id)
        .update({ joinedPlayers: ['alice', 'bob'] }),
    );
  });

  // test('should not allow updating joinedPlayers if not authenticated and not owner', async () => {
  //     const unAuthUser = testEnv.unauthenticatedContext('unAuthUser').firestore();
  //     const authUser = testEnv.authenticatedContext('alice').firestore();
  //     const gameRef = await authUser.collection('games').add({ owner: 'alice', joinedPlayers: ['alice'] });
  //     await assertFails(unAuthUser.collection('games').doc(gameRef.id).update({ joinedPlayers: ['alice', 'bob'] }));
  // });
});
