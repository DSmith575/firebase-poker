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

import { createDeck, shuffleDeck } from '../utils/poker/createDeck';

// Creates a deck when a game is made
export const createGame = async (gameName, playerLength, ownerId) => {
  try {
    const deck = createDeck();

    const gameRef = collection(firestore, 'games');
    const newGameRef = await addDoc(gameRef, {
      owner: ownerId,
      gameName: gameName,
      totalPlayers: playerLength,
      started: false,
      joinedPlayers: [],
      deck: deck,
    });

    await joinGame(ownerId, newGameRef.id);

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

    await updateDoc(gameRef, { joinedPlayers: arrayUnion(playerId) });

    // current turn decided when game is started, all players start as false
    // readyCheck is used for when players are waiting to start the game
    await setDoc(playerRef, {
      playerId: playerId,
      currentTurn: false,
      readyCheck: false,
      hand: [],
      hasMadeTurn: false,
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

export const getLobbyGameInformation = async (gameId, callback) => {
  try {
    const gameRef = doc(firestore, 'games', gameId);
    const unsubscribe = onSnapshot(
      gameRef,
      (snapshot) => {
        const gameData = snapshot.data();
        callback(gameData);
      },
      (error) => {
        console.error('Error fetching game data: ', error);
      },
    );

    return unsubscribe;
  } catch (error) {
    return error;
  }
};

export const gameLobbyPlayers = (gameId, callback) => {
  try {
    const playerRef = collection(firestore, 'games', gameId, 'players');
    const unsubscribe = onSnapshot(
      playerRef,
      (snapshot) => {
        const players = snapshot.docs.map((doc) => doc.data());
        callback(players);
      },
      (error) => {
        console.error('Error fetching game data: ', error);
      },
    );

    return unsubscribe;
  } catch (error) {
    console.error('Error setting up listener: ', error);
  }
};

export const confirmGame = async (gameId, playerId, readyState) => {
  try {
    const playerRef = doc(firestore, 'games', gameId, 'players', playerId);
    await updateDoc(playerRef, { readyCheck: readyState });
  } catch (error) {
    return error;
  }
};

export const startGame = async (gameId, players) => {
  try {
    const gameRef = doc(firestore, 'games', gameId);
    await updateDoc(gameRef, { started: true });
    await pickStartingPlayer(gameId, players);
    await drawPlayercards(gameId, 5);
  } catch (error) {
    return error;
  }
};

// Get the list of players from the firebase joinedPlayers array (gameLobby)
// Run a random function to pick one of the players to be the starting player for the game
export const pickStartingPlayer = async (gameId, players) => {
  try {
    const getPlayerStartTurn = Math.floor(Math.random() * players.length);
    const startingPlayer = players[getPlayerStartTurn];
    const playerRef = doc(firestore, 'games', gameId, 'players', startingPlayer.playerId);
    await updateDoc(playerRef, { currentTurn: true });
  } catch (error) {
    return error;
  }
};

// Shuffles the deck, then iterates through the joinedPlayers array and deals the cards to each player
// Updates the deck in the game document with the remaining cards and updates the players hand document
export const drawPlayercards = async (gameId, numberOfCardsToDraw) => {
  const gameRef = doc(firestore, 'games', gameId);
  try {
    const gameSnapshot = await getDoc(gameRef);

    const gameData = gameSnapshot.data();

    if (!gameData.deck || gameData.deck.length < numberOfCardsToDraw) {
      throw new Error('Not enough cards in deck to draw');
    }

    let shuffledDeck = shuffleDeck(gameData.deck);

    for (let playerId of gameData.joinedPlayers) {
      const playerRef = doc(firestore, 'games', gameId, 'players', playerId);
      const drawnCards = shuffledDeck.slice(0, numberOfCardsToDraw);
      const remainingDeck = shuffledDeck.slice(numberOfCardsToDraw);
      await updateDoc(gameRef, { deck: remainingDeck });
      await updateDoc(playerRef, { hand: drawnCards });

      shuffledDeck = remainingDeck;
    }

    return shuffledDeck;
  } catch (error) {
    console.error('Error drawing cards: ', error);
    throw error;
  }
};

export const getPlayerHand = async (gameId, playerId, callback) => {
  try {
    const playerRef = doc(firestore, 'games', gameId, 'players', playerId);
    const unsubscribe = onSnapshot(
      playerRef,
      (snapshot) => {
        console.log(snapshot.data());
        const playerData = snapshot.data();
        callback(playerData.hand);
      },
      (error) => {
        console.error('Error fetching player hand:', error);
      },
    );

    return unsubscribe;
  } catch (error) {
    console.error('Error fetching player hand:', error);
    throw error;
  }
};

const drawCardsFromDeck = async (gameId, count) => {
  const gameRef = doc(firestore, 'games', gameId);
  const gameSnapshot = await getDoc(gameRef);
  const gameData = gameSnapshot.data();
  const deck = gameData.deck;
  const drawnCards = deck.slice(0, count);
  const updatedDeck = deck.slice(count);

  await updateDoc(gameRef, { deck: updatedDeck });

  return drawnCards;
};

export const removeSelectedCardsAndDrawNew = async (gameId, playerId, selectedCards) => {
  try {
    const playerRef = doc(firestore, 'games', gameId, 'players', playerId);
    const playerSnapshot = await getDoc(playerRef);
    const playerData = playerSnapshot.data();
    const updatedHand = playerData.hand.filter((card) => {
      return !selectedCards.some(
        (selectedCard) => selectedCard.suit === card.suit && selectedCard.rank.label === card.rank.label,
      );
    });

    await updateDoc(playerRef, { hand: updatedHand });

    const newCards = await drawCardsFromDeck(gameId, selectedCards.length);

    const updatedPlayerSnapshot = await getDoc(playerRef);
    const updatedPlayerData = updatedPlayerSnapshot.data();
    const finalHand = [...updatedPlayerData.hand, ...newCards];

    await updateDoc(playerRef, { hand: finalHand });
    // Set this players currentTurn to false
    // Set the other plays currentTurn to true

    return finalHand;
  } catch (error) {
    console.error('Error removing selected cards and drawing new ones:', error);
    throw error;
  }
};

export const changeTurns = async (gameId, players, currentPlayerId) => {
  try {
    const currentPlayerIndex = players.findIndex((player) => player.playerId === currentPlayerId);
    const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
    const currentPlayerRef = doc(firestore, 'games', gameId, 'players', players[currentPlayerIndex].playerId);
    const nextPlayerRef = doc(firestore, 'games', gameId, 'players', players[nextPlayerIndex].playerId);

    await updateDoc(currentPlayerRef, { currentTurn: false });
    await updateDoc(nextPlayerRef, { currentTurn: true });
  } catch (error) {
    console.error('Error changing turns:', error);
    throw error;
  }
};

/*
  wait for each player to click start game?
  use counter to keep track if all players have pressed start
  once started, pick random player and set their turn to true
  */

/*
turn: discard x cards
then can end turn
once both players have made their choices
only cards in hand are counted
*/
