import { firestore } from '../firebase';
import {
  collection,
  addDoc,
  setDoc,
  onSnapshot,
  query,
  arrayUnion,
  doc,
  updateDoc,
  orderBy,
  arrayRemove,
  deleteDoc,
  getDoc,
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
    return error;
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

export const joinGame = async (playerId, gameId) => {
  try {
    const playerRef = doc(firestore, 'games', gameId, 'players', playerId);
    const gameRef = doc(firestore, 'games', gameId);

    // const checkIfOwner = await getDoc(gameRef);
    // const gameData = checkIfOwner.data();

    // if (playerId === gameData.owner) {
    //   console.log('hit');
    // }

    await updateDoc(gameRef, { joinedPlayers: arrayUnion(playerId) });

    // current turn decided when game is started, all players start as false
    // readyCheck is used for when players are waiting to start the game
    await setDoc(playerRef, {
      playerId: playerId,
      currentTurn: false,
      readyCheck: false,
      discarded: [],
    });
  } catch (error) {
    return error;
  }
};

export const leaveGame = async (playerId, gameId) => {
  try {
    const playerRef = doc(firestore, 'games', gameId, 'players', playerId);
    const gameRef = doc(firestore, 'games', gameId);

    await updateDoc(gameRef, { joinedPlayers: arrayRemove(playerId) });
    await deleteDoc(playerRef);
  } catch (error) {
    return error;
  }
};

export const startGame = async () => {
  /*
  wait for each player to click start game?
  use counter to keep track if all players have pressed start
  once started, pick random player and set their turn to true
  */
};

/*
turn: discard x cards
then can end turn
once both players have made their choices
only cards in hand are counted
*/
