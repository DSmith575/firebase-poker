import { NavLink, useParams } from 'react-router-dom';
import useGameLobby from '../../../../hooks/games/useGameLobby';
import ButtonSpinner from '../../../spinner/ButtonSpinner';
import Button from '../../../button/Button';
import { confirmGame, startGame } from '../../../../firestore/firestoreFunctions';
import { useUserAuth } from '../../../../context/FirestoreAuthContext';

const Game = () => {
  const { gameId } = useParams();
  const { gameLobby, gameData, loading } = useGameLobby(gameId);
  const { user } = useUserAuth();

  const handleConfirm = () => {
    confirmGame(gameId, user, true);
  };

  const handleUnReady = () => {
    confirmGame(gameId, user, false);
  };

  const handleGameStart = () => {
    startGame(gameId);
  };
  return (
    <>
      {loading('gameLobby') ? (
        <ButtonSpinner styles="animate-spin h-10 w-10 text-black" />
      ) : (
        <section className="grid grid-cols-6 grid-rows-3">
          <h1 className={'font-bold flex col-span-6 justify-center items-center'}>{gameData.gameName}</h1>
          <p className={'col-span-6 text-center'}>Game Started: {gameData.started === true ? 'Yes' : 'No'}</p>
          <div className="flex row-start-2 col-span-6 justify-evenly">
            {gameLobby.map((player) => (
              <div className={'relative group'}>
                <div
                  class={`absolute -inset-1 bg-gradient-to-r from-green-500 via-red-500 to-violet-600 rounded-3xl blur transition duration-1000 ${player.readyCheck === true ? 'opacity-80 animate-pulse' : 'opacity-0'}`}></div>
                <div className={`border rounded-lg h-[200px] flex flex-col relative bg-slate-100`} key={player.playerId}>
                  <h1 className="font-bold">Player: {player.playerId}</h1>
                  <p className={`text-center mb-8 mt-4 mx-auto rounded-md`}>
                    <span className={'font-bold'}>Ready: </span>
                    {player.readyCheck === false ? 'No' : 'Yes'}
                  </p>
                  <div className="flex justify-center">
                    {user === player.playerId &&
                      (player.readyCheck === false ? (
                        <Button
                          onClick={handleConfirm}
                          label={'Ready'}
                          styles={`items-center px-3 py-2 text-md font-medium text-center text-white bg-green-500 rounded-lg hover:bg-sky-600 transition ease-in-and-out duration-700`}
                        />
                      ) : (
                        <Button
                          label={'Unready'}
                          onClick={handleUnReady}
                          styles={`items-center px-3 py-2 text-md font-medium text-center text-white bg-slate-500 rounded-lg hover:bg-red-600 transition ease-in-and-out duration-700`}
                        />
                      ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Check every player in the lobby array is ready and render the start button */}
          {user === gameData.owner && gameLobby.every((player) => player.readyCheck) && (
            <div className={'row-start-3 col-span-full flex justify-center items-center mt-4'}>
              <button
                onClick={handleGameStart}
                // to={`/games/session/${gameId}`}
                className={`flex px-3 py-2 h-16 w-32 text-md font-medium
              justify-center items-center
              text-white bg-green-500 rounded-lg hover:bg-green-600
              transition ease-in-and-out duration-700
              `}>
                Start Game
              </button>
            </div>
          )}
        </section>
      )}
    </>
  );
};

export default Game;
