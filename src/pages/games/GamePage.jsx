import { useParams } from 'react-router-dom';
import { useUserAuth } from '../../context/FirestoreAuthContext';
import { getPlayerHand, removeSelectedCardsAndDrawNew } from '../../firestore/firestoreFunctions';
import { useEffect, useState } from 'react';
import PlayerHand from '../../components/poker/session/gameSession/PlayerHand';

const GamePage = () => {
  const { gameId } = useParams();
  const { user } = useUserAuth();
  const [playerHand, setPlayerHand] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [selectedCards, setSelectedCards] = useState([]);

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
      // Call function to remove selected cards and draw new ones
      await removeSelectedCardsAndDrawNew(gameId, user, selectedCards);
    } catch (error) {
      console.error('Error removing selected cards and drawing new ones:', error);
    }
  };
  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <PlayerHand hand={playerHand} handleSelectCard={handleSelectCard} handleRemoveSelected={handleRemoveSelected} />
      )}
    </>
  );
};

export default GamePage;
