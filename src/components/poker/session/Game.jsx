import { useParams } from 'react-router-dom';
import useGameLobby from '../../../hooks/games/useGameLobby';
import ButtonSpinner from '../../spinner/ButtonSpinner';
import Button from '../../button/Button';
import { confirmGame } from '../../../firestore/firestoreFunctions';
import { useUserAuth } from '../../../context/FirestoreAuthContext';

const Game = () => {
  const { id } = useParams();
  const { gameLobby, loading } = useGameLobby(id);
  const { user } = useUserAuth();

  const handleConfirm = () => {
    confirmGame(id, user, true);
  };

  const handleUnReady = () => {
    confirmGame(id, user, false);
  };

  return (
    <>
      {loading('gameLobby') ? (
        <div className="flex items-center justify-center z-50">
          <ButtonSpinner styles="animate-spin h-10 w-10 text-black" />
        </div>
      ) : (
        <section className="grid grid-cols-6 grid-rows-3">
          <div className="flex row-start-2 col-span-6 justify-evenly">
            {gameLobby.map((player) => (
              <div className="border rounded-lg h-[200px]  flex flex-col" key={player.playerId}>
                <h1 className="font-bold">Player: {player.playerId}</h1>
                {/* <p>Current Turn: {player.currentTurn === false ? 'no' : 'yes'}</p> */}
                <p
                  className={`text-center mb-8 mt-4 mx-auto rounded-md ${player.readyCheck === false ? 'bg-red-500' : 'bg-blue-500'}`}>
                  <span className={'font-bold'}>Ready: </span>
                  {player.readyCheck.toString()}
                </p>
                <div className="flex justify-center">
                  {user === player.playerId &&
                    (player.readyCheck === false ? (
                      <Button
                        onClick={handleConfirm}
                        label={'Ready'}
                        styles={
                          'items-center px-3 py-2 text-md font-medium text-center text-white bg-slate-500 rounded-lg hover:bg-sky-600 transition ease-in-and-out duration-700'
                        }
                      />
                    ) : (
                      <Button
                        label={'Not ready'}
                        onClick={handleUnReady}
                        styles={
                          'items-center px-3 py-2 text-md font-medium text-center text-white bg-slate-500 rounded-lg hover:bg-sky-600 transition ease-in-and-out duration-700'
                        }
                      />
                    ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default Game;
