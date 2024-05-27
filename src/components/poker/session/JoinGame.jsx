import { useState } from 'react';
import { useUserAuth } from '../../../context/FirestoreAuthContext';
import { joinGame } from '../../../firestore/firestoreFunctions';
import Button from '../../button/Button';
const JoinGame = ({ gameId, gameStarted }) => {
  const { user } = useUserAuth();
  const [error, setError] = useState('');

  const handleJoinGame = async () => {
    try {
      setError('');
      await joinGame(user, gameId, gameStarted);
      console.log('Game joined');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button type={'button'} onClick={handleJoinGame} label={'Join Game'} />
    </>
  );
};

export default JoinGame;
