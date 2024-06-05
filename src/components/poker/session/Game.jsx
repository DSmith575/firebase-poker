import { useParams } from 'react-router-dom';
import { getGame } from '../../../firestore/firestoreFunctions';
import { useEffect, useState } from 'react';
import { useUserAuth } from '../../../context/FirestoreAuthContext';

const Game = () => {
  const { id } = useParams();
  const { user } = useUserAuth();
  const [game, setGame] = useState([]);

  useEffect(() => {
    const fetchGame = async () => {
      const game = await getGame(id);
      setGame(game);
    };
    fetchGame();
  }, []);

  return (
    <>
      {game && (
        <section className="grid grid-cols-6 grid-rows-3">
          <div className="flex row-start-2 col-span-6 justify-evenly">
            {game.map((player) => (
              <div className="border rounded-lg h-[200px]  flex flex-col" key={player.playerId}>
                <h1 className="font-bold">Player: {player.playerId}</h1>
                {/* <p>Current Turn: {player.currentTurn === false ? 'no' : 'yes'}</p> */}
                <p
                  className={`text-center mb-8 mt-4 mx-auto rounded-md ${player.readyCheck === false ? 'bg-red-500' : 'bg-blue-500'}`}>
                  <span className={'font-bold'}>Ready: </span>
                  {player.readyCheck.toString()}
                </p>
                <button className="">Confirm</button>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default Game;
