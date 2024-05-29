import { firestore } from '../firebase';
import {
  collection,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  arrayUnion,
  doc,
  updateDoc,
  orderBy,
} from 'firebase/firestore';

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
    const gamesQuery = query(gameRef, orderBy('totalPlayers'));

    return onSnapshot(gamesQuery, callback);
  } catch (error) {
    return error;
  }
};

export const joinGame = async (playerId, gameId, currentTurn) => {
  try {
    const playerRef = doc(firestore, 'games', gameId, 'players', playerId);
    const gameRef = doc(firestore, 'games', gameId);

    await updateDoc(gameRef, { joinedPlayers: arrayUnion(playerId) });

    await setDoc(playerRef, {
      playerId: playerId,
      currentTurn: currentTurn,
      discarded: [],
    });
  } catch (error) {
    throw error;
  }
};
