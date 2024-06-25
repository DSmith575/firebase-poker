import { useState, useEffect } from 'react';
import useLoading from '../loading/useLoading';
import { gameLobbyPlayers } from '../../firestore/firestoreFunctions';
import { getLobbyGameInformation } from '../../firestore/firestoreFunctions';
import { useNavigate } from 'react-router-dom';

const useGameLobby = (id) => {
  const [gameLobby, setGameLobby] = useState([]);
  const [gameData, setGameData] = useState({});
  const { loading, setLoading } = useLoading();
  const navigate = useNavigate();

  const fetchGameLobby = async () => {
    try {
      setLoading('gameLobby', true);
      console.log('testing');
      // await new Promise((resolve) => setTimeout(resolve, 2000));
      const unsubscribeGameLobby = await getLobbyGameInformation(id, (game) => {
        setGameData(game);
        if (game.started) {
          console.log('Game started, navigating to game session');
          navigate(`/games/session/${id}`); // Navigate to game page
        }
      });

      const unsubscribe = gameLobbyPlayers(id, (players) => {
        setGameLobby(players);
      });

      return () => {
        unsubscribe();
        unsubscribeGameLobby();
      };
    } catch (error) {
      console.log(error);
    } finally {
      setLoading('gameLobby', false);
    }
  };

  useEffect(() => {
    fetchGameLobby();
  }, [gameData.started]);

  return { gameLobby, loading, gameData };
};

export default useGameLobby;
