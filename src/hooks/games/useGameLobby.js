import { useState, useEffect } from 'react';
import useLoading from '../loading/useLoading';
import { gameLobbyPlayers } from '../../firestore/firestoreFunctions';
import { getLobbyGameInformation } from '../../firestore/firestoreFunctions';

const useGameLobby = (id) => {
  const [gameLobby, setGameLobby] = useState([]);
  const [gameData, setGameData] = useState({});
  const { loading, setLoading } = useLoading();

  const fetchGameLobby = async () => {
    try {
      setLoading('gameLobby', true);
      // await new Promise((resolve) => setTimeout(resolve, 2000));
      const gameData = await getLobbyGameInformation(id);
      setGameData(gameData);
      const unsubscribe = gameLobbyPlayers(id, (players) => {
        setGameLobby(players);
      });

      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    } catch (error) {
      console.log(error);
    } finally {
      setLoading('gameLobby', false);
    }
  };

  useEffect(() => {
    fetchGameLobby();
  }, []);

  return { gameLobby, loading, gameData };
};

export default useGameLobby;
