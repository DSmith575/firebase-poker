import { createGame } from '../../../firestore/firestoreFunctions';
import { useState } from 'react';
import { useUserAuth } from '../../../context/FirestoreAuthContext';

const CreateGame = () => {
  const [gameName, setGameName] = useState('');
  const [maxPlayers, setMaxPLayers] = useState(2);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useUserAuth();

  const handleCreation = async (event) => {
    try {
      event.preventDefault();
      setError('');
      setLoading('createGame', true);
      await createGame(gameName, maxPlayers, user);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading('createGame', false);
      setMaxPLayers(2);
      setGameName('');
    }
  };

  return (
    <form onSubmit={handleCreation}>
      <label>
        Game Name:
        <input type="text" value={gameName} onChange={(e) => setGameName(e.target.value)} />
      </label>
      <label>
        Max Players:
        <input type="number" value={maxPlayers} onChange={(e) => setMaxPLayers(e.target.value)} />
      </label>
      <button type="submit" disabled={loading}>
        {loading ? 'Creating Game...' : 'Create Game'}
      </button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default CreateGame;
