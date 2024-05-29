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
      <Button
        type={'button'}
        onClick={handleJoinGame}
        label={'Join Game'}
        styles={
          'inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        }
      />
    </>
  );
};

export default JoinGame;
