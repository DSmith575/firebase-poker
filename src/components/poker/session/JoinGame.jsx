import { useState } from 'react';
import { useUserAuth } from '../../../context/FirestoreAuthContext';
import { joinGame } from '../../../firestore/firestoreFunctions';
import Button from '../../button/Button';
import useLoading from '../../../hooks/loading/useLoading';
import ButtonSpinner from '../../spinner/ButtonSpinner';

const JoinGame = ({ gameId, playerList, totalPlayers }) => {
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
      await joinGame(user, gameId);
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
          'items-center px-3 py-2 text-md font-medium text-center text-white bg-slate-500 rounded-lg hover:bg-sky-600 transition ease-in-and-out duration-700 ml-4'
        }
      />
    </>
  );
};

export default JoinGame;
