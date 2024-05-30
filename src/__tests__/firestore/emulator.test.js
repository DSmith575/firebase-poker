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

  test('should not allow deleting a game if the user is not authenticated', async () => {
    const authUser = testEnv.authenticatedContext('alice').firestore();
    const gameRef = await authUser.collection('games').add({ owner: 'alice', joinedPlayers: ['alice'] });

    const unAuthUser = testEnv.unauthenticatedContext('unAuthUser').firestore();
    assertFails(unAuthUser.collection('games').doc(gameRef.id).delete());
  });

  test('should not allow deleting a game if the user is authenticated, but is not the owner of the game', async () => {
    const authUser = testEnv.authenticatedContext('alice').firestore();
    const gameRef = await authUser.collection('games').add({ owner: 'alice', joinedPlayers: ['alice'] });
    const newPlayer = testEnv.authenticatedContext('bob').firestore();
    assertFails(newPlayer.collection('games').doc(gameRef.id).delete());
  });

  test('should allow deleting a game if the user is authenticated, and is the owner of the game', async () => {
    const authUser = testEnv.authenticatedContext('alice').firestore();
    const gameRef = await authUser.collection('games').add({ owner: 'alice', joinedPlayers: ['alice'] });
    assertSucceeds(authUser.collection('games').doc(gameRef.id).delete());
  });

  test('should not allow updating game (joining) if not authenticated', async () => {
    const unAuthUser = testEnv.unauthenticatedContext('unAuthUser').firestore();
    const authUser = testEnv.authenticatedContext('alice').firestore();
    const gameRef = await authUser.collection('games').add({ owner: 'alice', joinedPlayers: ['alice'] });
    await assertFails(
      unAuthUser
        .collection('games')
        .doc(gameRef.id)
        .update({ joinedPlayers: ['alice', 'bob'] }),
    );
  });

  test('should allow updating (joining) game if authenticated', async () => {
    const authUser = testEnv.authenticatedContext('alice').firestore();
    // Create a new game document
    const gameRef = await authUser.collection('games').add({
      owner: 'alice',
      joinedPlayers: [],
      started: false,
    });
    // Add owner to the joinedPlayers array
    const playerRef = gameRef.collection('players').doc('alice');
    await playerRef.set({ currentTurn: 'alice', discarded: [], playerId: 'alice' });
    await assertSucceeds(
      authUser
        .collection('games')
        .doc(gameRef.id)
        .update({ joinedPlayers: ['alice'] }),
    );
  });

  // Test if non-owner can start a game
  test("should not allow a player in the game to start who isn't the owner", async () => {
    const aliceRef = testEnv.authenticatedContext('alice').firestore();
    const bobRef = testEnv.authenticatedContext('bob').firestore();

    const gameRef = await aliceRef.collection('games').add({
      owner: 'alice',
      joinedPlayers: ['alice'],
      started: false,
    });

    const playerRef = gameRef.collection('players').doc('alice');
    await playerRef.set({ currentTurn: 'alice', discarded: [], playerId: 'alice' });

    await bobRef
      .collection('games')
      .doc(gameRef.id)
      .update({ joinedPlayers: ['alice', 'bob'] });

    await assertFails(bobRef.collection('games').doc(gameRef.id).update({ started: true }));
  });

  // Test that owner can start the game
  test('should let the owner start the game', async () => {
    const aliceRef = testEnv.authenticatedContext('alice').firestore();
    const gameRef = await aliceRef.collection('games').add({
      owner: 'alice',
      joinedPlayers: ['alice'],
      started: false,
    });

    await assertSucceeds(aliceRef.collection('games').doc(gameRef.id).update({ started: true }));
  });

  test('should not be able to delete a player from the game if not authenticated', async () => {
    const unAuthUser = testEnv.unauthenticatedContext('unAuthUser').firestore();
    const authUser = testEnv.authenticatedContext('alice').firestore();
    const gameRef = await authUser.collection('games').add({ owner: 'alice', joinedPlayers: ['alice'] });
    await assertFails(unAuthUser.collection('games').doc(gameRef.id).collection('players').doc('alice').delete());
  });

  test('should be able to delete (leave) a game', async () => {
    const aliceRef = testEnv.authenticatedContext('alice').firestore();
    const gameRef = await aliceRef.collection('games').add({
      owner: 'alice',
      joinedPlayers: ['alice'],
      started: false,
    });

    const playerRef = gameRef.collection('players').doc('alice');
    await playerRef.set({ currentTurn: 'alice', discarded: [], playerId: 'alice' });
    await assertSucceeds(gameRef.collection('players').doc('alice').delete());
  });
});
