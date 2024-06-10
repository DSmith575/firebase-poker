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
  // console.log(gameLobby[0].playerId);
  const handleConfirm = () => {
    // const x = confirmGame(id, gameLobby[0].playerId);
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
                {user && <Button onClick={handleConfirm} label={'Confirm'} />}
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default Game;
