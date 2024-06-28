import { useParams } from 'react-router-dom';
import useGameLobby from '../../../../hooks/games/useGameLobby';
import ButtonSpinner from '../../../spinner/ButtonSpinner';
import Button from '../../../button/Button';
import { confirmGame, startGame } from '../../../../firestore/firestoreFunctions';
import { useUserAuth } from '../../../../context/FirestoreAuthContext';

const Game = () => {
  const { gameId } = useParams();
  const { gameLobby, gameData, loading } = useGameLobby(gameId);
  const { user } = useUserAuth();

  // Handle ready/unready checks for lobby
  // I've used two different functions because-
  // doing a normal !bool was not working properly, may have missed a step
  const handleConfirm = () => {
    confirmGame(gameId, user, true);
  };

  const handleUnReady = () => {
    confirmGame(gameId, user, false);
  };

  const handleGameStart = () => {
    startGame(gameId, gameLobby);
  };
  return (
    <>
      {loading('gameLobby') ? (
        <ButtonSpinner styles="animate-spin h-10 w-10 text-black" />
      ) : (
        <section className="grid grid-cols-2 grid-rows-1 md:grid-cols-6 md:grid-rows-3 ">
          <h1 className="font-bold text-4xl text-center col-span-6 flex justify-center items-center mt-4 mb-4">
            <span className="mr-2">Table:</span>
            {gameData.gameName}
          </h1>

          <div className="md:flex col-span-2 md:row-start-2 md:col-span-6 justify-evenly">
            {gameLobby.map((player) => (
              <div className={'relative group'} key={player.playerId}>
                <div
                  className={`p-6 mb-4 mx-4 sm:mx-6 md:mx-0 absolute -inset-1 bg-gradient-to-r from-green-500 via-red-500 to-violet-600 rounded-3xl blur transition duration-1000 ${player.readyCheck === true ? 'opacity-80 animate-pulse' : 'opacity-0'}`}></div>
                <div
                  className={`border rounded-lg h-[200px] flex flex-col relative bg-slate-100 p-6 mb-4 mx-4 sm:mx-6 md:mx-0 text-center`}>
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
          {user === gameData.owner &&
            gameLobby.length === gameData.totalPlayers &&
            gameLobby.every((player) => player.readyCheck) && (
              <div className={'row-start-3 col-span-full flex justify-center items-center mt-4'}>
                <Button
                  label={'Start Game'}
                  onClick={handleGameStart}
                  styles={`flex px-3 py-2 h-16 w-32 text-md font-medium
              justify-center items-center
              text-white bg-green-500 rounded-lg hover:bg-green-600
              transition ease-in-and-out duration-700
              `}
                />
              </div>
            )}
        </section>
      )}
    </>
  );
};

export default Game;
