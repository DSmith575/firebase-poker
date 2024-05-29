import { useEffect, useState } from 'react';
import { getGameList } from '../../firestore/firestoreFunctions';
import useLoading from '../loading/useLoading';
import { useUserAuth } from '../../context/FirestoreAuthContext';

const useGameList = (filter) => {
  const [games, setGames] = useState([]);
  const { loading, setLoading } = useLoading();
  const { user } = useUserAuth();

  const fetchGames = async () => {
    try {
      setLoading('gameList', true);

      // await new Promise((resolve) => setTimeout(resolve, 2000));
      return getGameList({
        collectionName: 'games',
        callback: (snapshot) => {
          const updatedGameList = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
          // Filter the list of games, only shows games that have not started
          const filterList = updatedGameList.filter((game) =>
            filter ? game.owner === user && game.started === false : game.started === false,
          );
          setGames(filterList);
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
  }, [filter]);

  return { games, loading };
};

export default useGameList;
