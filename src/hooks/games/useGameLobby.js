import { useState, useEffect } from 'react';
import useLoading from '../loading/useLoading';
import { getGame } from '../../firestore/firestoreFunctions';

const useGameLobby = (id) => {
  const [gameLobby, setGameLobby] = useState([]);
  const { loading, setLoading } = useLoading();

  const fetchGameLobby = async () => {
    try {
      setLoading('gameLobby', true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const game = await getGame(id);
      setGameLobby(game);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading('gameLobby', false);
    }
  };

  useEffect(() => {
    fetchGameLobby();
  }, [id]);

  return { gameLobby, loading };
};

export default useGameLobby;
