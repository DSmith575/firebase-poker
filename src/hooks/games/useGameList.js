import { useEffect, useState } from 'react';
import { getGameList } from '../../firestore/firestoreFunctions';
import useLoading from '../loading/useLoading';
import { useUserAuth } from '../../context/FirestoreAuthContext';

const useGameList = (filterCreated, filterJoined) => {
  const [games, setGames] = useState([]);
  const { loading, setLoading } = useLoading();
  const { user } = useUserAuth();

  // Fetches the list of games from the Firestore database
  // Moved to a custom hook, for re-usable code
  const fetchGames = async () => {
    try {
      setLoading('gameList', true);

      await new Promise((resolve) => setTimeout(resolve, 2000));
      return getGameList({
        collectionName: 'games',
        callback: (snapshot) => {
          const updatedGameList = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
          // Filter the list of games, only shows games that have not started
          if (filterCreated) {
            const filterCreatedGames = updatedGameList.filter((game) => game.owner === user);
            return setGames(filterCreatedGames);
          }
          if (filterJoined) {
            const filterJoinedGames = updatedGameList.filter((game) => game.joinedPlayers.includes(user));
            console.log(filterJoinedGames);
            return setGames(filterJoinedGames);
          }

          const filterNotStartedGames = updatedGameList.filter((game) => game.started === false);
          return setGames(filterNotStartedGames);
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading('gameList', false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, [filterCreated, filterJoined]);

  return { games, loading };
};

export default useGameList;
