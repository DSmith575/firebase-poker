import { useEffect, useState } from 'react';
import { getGameList } from '../../firestore/firestoreFunctions';
import useLoading from '../loading/useLoading';

const useGameList = () => {
  const [games, setGames] = useState([]);
  const { loading, setLoading } = useLoading();

  const fetchGames = async () => {
    try {
      setLoading('gameList', true);
      console.log(loading('gameList'));
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return getGameList({
        collectionName: 'games',
        callback: (snapshot) => {
          const updatedGameList = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
          setGames(updatedGameList);
        },
      });
    } catch (error) {
      throw error;
    } finally {
      setLoading('gameList', false);
    }
  };

  useEffect(() => {
    fetchGames();
    console.log(loading);
  }, []);

  return { games, loading };
};

export default useGameList;
