import { useParams } from 'react-router-dom';
import { useUserAuth } from '../../context/FirestoreAuthContext';
import useGameLobby from '../../hooks/games/useGameLobby';
import { drawPlayercards } from '../../firestore/firestoreFunctions';
import { useEffect } from 'react';

const GamePage = () => {
  const { gameId } = useParams();
  const { user } = useUserAuth();

  return (
    <>
      <h1>Game Session</h1>
    </>
  );
};

export default GamePage;
