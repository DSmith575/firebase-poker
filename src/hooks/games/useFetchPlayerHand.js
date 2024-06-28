import { useEffect, useState } from 'react';
import { getPlayerHand, removeSelectedCardsAndDrawNew, changeTurns } from '../../firestore/firestoreFunctions';
import useLoading from '../loading/useLoading';
import { useUserAuth } from '../../context/FirestoreAuthContext';

const useFetchPlayerHand = (gameId, gameLobby) => {
  const { user } = useUserAuth();
  const [playerHand, setPlayerHand] = useState([]);
  const { loading, setLoading } = useLoading();
  const [selectedCards, setSelectedCards] = useState([]);
  const [isCurrentTurn, setIsCurrentTurn] = useState(false);

  const fetchPlayerHand = async () => {
    try {
      setLoading('playerHand', true);

      const unsubscribePlayerHand = await getPlayerHand(gameId, user, (playerData) => {
        setPlayerHand(playerData);
      });

      const currentUser = gameLobby.find((player) => player.playerId === user);
      setIsCurrentTurn(currentUser?.currentTurn);

      return () => {
        if (unsubscribePlayerHand) {
          unsubscribePlayerHand();
        }
      };
    } catch (error) {
      console.error('Error fetching player hand:', error);
    } finally {
      setLoading('playerHand', false);
    }
  };

  useEffect(() => {
    // if statement to check user or the gameID exists before fetching player hands
    // Preventing console errors appearing on first load/page refresh
    if (!user || !gameId || !gameLobby) return;
    fetchPlayerHand();
  }, [gameId, user, gameLobby]);

  const handleSelectCard = (selectedCards) => {
    setSelectedCards(selectedCards);
  };

  // Remove selected cards/draw new ones and end the players turn
  const handleRemoveSelected = async () => {
    try {
      await removeSelectedCardsAndDrawNew(gameId, user, selectedCards);
      await changeTurns(gameId, gameLobby, user);
    } catch (error) {
      console.error('Error removing selected cards and drawing new ones:', error);
    }
  };

  return { playerHand, loading, handleSelectCard, handleRemoveSelected, isCurrentTurn };
};

export default useFetchPlayerHand;
