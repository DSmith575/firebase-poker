import { useParams } from 'react-router-dom';
import { useUserAuth } from '../../context/FirestoreAuthContext';
import { changeTurns, getPlayerHand, removeSelectedCardsAndDrawNew } from '../../firestore/firestoreFunctions';
import { useEffect, useState } from 'react';
import PlayerHand from '../../components/poker/session/gameSession/PlayerHand';
import useGameLobby from '../../hooks/games/useGameLobby';

const GamePage = () => {
  const { gameId } = useParams();
  const { user } = useUserAuth();
  const [playerHand, setPlayerHand] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCards, setSelectedCards] = useState([]);
  const { gameLobby } = useGameLobby(gameId);

  console.log(gameLobby);
  useEffect(() => {
    let unsubscribePlayerHand;

    const fetchPlayerHand = async () => {
      try {
        unsubscribePlayerHand = await getPlayerHand(gameId, user, (playerData) => {
          setPlayerHand(playerData);
          setLoading(false);
        });
      } catch (error) {
        console.error('Error fetching player hand:', error);
        setLoading(false);
      }
    };

    fetchPlayerHand();

    return () => {
      if (unsubscribePlayerHand) {
        unsubscribePlayerHand(); // Cleanup listener
      }
    };
  }, [gameId, user]);

  const handleSelectCard = (selectedCards) => {
    setSelectedCards(selectedCards);
  };

  const handleRemoveSelected = async () => {
    try {
      await removeSelectedCardsAndDrawNew(gameId, user, selectedCards);
      await changeTurns(gameId, gameLobby, user);
    } catch (error) {
      console.error('Error removing selected cards and drawing new ones:', error);
    }
  };

  const currentUser = gameLobby.find((player) => player.playerId === user);
  const isCurrentTurn = currentUser?.currentTurn;

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : isCurrentTurn ? (
        <PlayerHand hand={playerHand} handleSelectCard={handleSelectCard} handleRemoveSelected={handleRemoveSelected} />
      ) : (
        <p>Waiting for your turn...</p>
      )}
    </>
  );
};

export default GamePage;
