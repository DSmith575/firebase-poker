import { useState } from 'react';
import { useUserAuth } from '../../../context/FirestoreAuthContext';
import Button from '../../button/Button';
import useLoading from '../../../hooks/loading/useLoading';
import ButtonSpinner from '../../spinner/ButtonSpinner';
import { leaveGame } from '../../../firestore/firestoreFunctions';

const LeaveGame = ({ game, player }) => {
  const { user } = useUserAuth();
  const [error, setError] = useState('');
  const { loading, setLoading } = useLoading();

  const handleLeaveGame = async () => {
    try {
      setLoading('leaveGame', true);
      setError('');
      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (!game.joinedPlayers.includes(player)) {
        return setError('You are not in this game');
      }

      setError('');
      await leaveGame(player, game.id);
    } catch (error) {
      setError(error);
    } finally {
      setLoading('leaveGame', false);
    }
  };

  return (
    <>
      {error && <p className="text-red-700 text-sm">{error}</p>}
      <Button
        type={'button'}
        onClick={handleLeaveGame}
        label={loading('leaveGame') ? <ButtonSpinner styles={'w-6 h-6 animate-spin'} /> : 'Leave Game'}
        styles={
          'inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-purple-700 rounded-lg hover:bg-green-500 '
        }
      />
    </>
  );
};

export default LeaveGame;
