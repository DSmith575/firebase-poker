import { firestore } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

export const createGame = async (gameName, playerLength, ownerId) => {
  const gameRef = collection(firestore, 'games');
  const newGameRef = await addDoc(gameRef, {
    owner: ownerId,
    name: gameName,
    totalPlayers: playerLength,
    started: false,
    joinedPlayers: [],
  });
  return newGameRef.id;
};
