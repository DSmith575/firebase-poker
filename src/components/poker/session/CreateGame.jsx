import { useState } from 'react';
import { createGame } from '../../../firestore/firestoreFunctions';
import { useUserAuth } from '../../../context/FirestoreAuthContext';
import { authSectionStyles } from '../../../styles/authForm/authFormStyles';
import CreateGameForm from '../forms/CreateGameForm';
import PlayerGridForm from '../forms/PlayerGridForm';
import ButtonSpinner from '../../spinner/ButtonSpinner';
import useFormInput from '../../../hooks/forms/useFormInput';
import useLoading from '../../../hooks/loading/useLoading';

const CreateGame = () => {
  const [error, setError] = useState('');
  const { loading, setLoading } = useLoading();
  const { user } = useUserAuth();
  const gameName = useFormInput('');
  const playerLimit = useFormInput(2);

  const checkUserLoggedIn = () => {
    if (!user) {
      throw new Error('You must be signed in to create a game');
    }
  };

  const checkGameName = () => {
    if (gameName.value.length < 1 || gameName.value.startsWith(' ')) {
      throw new Error('Game name must be at least 1 character long and not start with a space');
    }
  };

  const handleCreation = async (event) => {
    try {
      event.preventDefault();
      setError('');
      checkUserLoggedIn();
      checkGameName();
      setLoading('createGame', true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await createGame(gameName.value, playerLimit.value, user);
    } catch (error) {
      setError(`${error.message}`);
    } finally {
      setLoading('createGame', false);
      gameName.reset();
      playerLimit.reset();
    }
  };

  return (
    <>
      <section className={authSectionStyles.authBase}>
        <CreateGameForm
          handleCreateSubmit={handleCreation}
          inputType={'text'}
          placeHolder={'Game Name...'}
          value={gameName.value}
          onChange={gameName.onChange}
          buttonStyles={
            'p-4 w-[185px] flex justify-center border rounded-lg bg-slate-500 text-white hover:bg-sky-600 transition ease-in-and-out duration-700'
          }
          buttonType={'submit'}
          loadingState={loading('createGame')}
          buttonLabel={loading('createGame') ? <ButtonSpinner styles={'animate-spin h-6 w-6'} /> : 'Create Game'}>
          <div className="my-8">
            <PlayerGridForm
              playerGridLabel={'Players: '}
              disabled={loading('createGame')}
              value={playerLimit.value}
              onClick={playerLimit.onClick}
              label={playerLimit.value}
            />
          </div>
          {error && <p className={'text-red-500 text-center'}>{error}</p>}
        </CreateGameForm>
      </section>
    </>
  );
};

export default CreateGame;
