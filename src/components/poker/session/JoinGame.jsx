import { useState } from 'react';
import { useUserAuth } from '../../../context/FirestoreAuthContext';
import { joinGame } from '../../../firestore/firestoreFunctions';
import Button from '../../button/Button';
import useLoading from '../../../hooks/loading/useLoading';
import ButtonSpinner from '../../spinner/ButtonSpinner';

const JoinGame = ({ gameId, gameStarted, playerList, totalPlayers }) => {
  const { user } = useUserAuth();
  const [error, setError] = useState('');
  const { loading, setLoading } = useLoading();

  const handleJoinGame = async () => {
    try {
      setLoading('joinGame', true);
      setError('');
      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (playerList.includes(user)) {
        return setError('You are already in this game');
      }

      if (totalPlayers === playerList.length) {
        return setError('This game is full');
      }
      setError('');
      await joinGame(user, gameId, gameStarted);
    } catch (error) {
      setError(error);
    } finally {
      setLoading('joinGame', false);
    }
  };

  return (
    <>
      {error && <p className="text-red-700 text-sm">{error}</p>}
      <Button
        type={'button'}
        onClick={handleJoinGame}
        label={loading('joinGame') ? <ButtonSpinner styles={'w-6 h-6 animate-spin'} /> : 'Join Game'}
        styles={
          'inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 '
        }
      />
    </>
  );
};

export default JoinGame;
