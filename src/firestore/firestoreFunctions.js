import { firestore } from '../firebase';
import { collection, addDoc, onSnapshot, query } from 'firebase/firestore';

export const createGame = async (gameName, playerLength, ownerId) => {
  try {
    const gameRef = collection(firestore, 'games');
    const newGameRef = await addDoc(gameRef, {
      owner: ownerId,
      gameName: gameName,
      totalPlayers: playerLength,
      started: false,
      joinedPlayers: [],
    });
    return newGameRef.id;
  } catch (error) {
    throw error;
  }
};

export const getGameList = async ({ collectionName, callback }) => {
  try {
    const gameRef = collection(firestore, collectionName);
    const gamesQuery = query(gameRef);

    return onSnapshot(gamesQuery, callback);
  } catch (error) {
    throw error;
  }
};
