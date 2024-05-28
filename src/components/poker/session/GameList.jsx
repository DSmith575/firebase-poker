import useGameList from '../../../hooks/games/useGameList';
import JoinGame from './JoinGame';
import { ImSpinner2 } from 'react-icons/im';
import ButtonSpinner from '../../spinner/ButtonSpinner';

const GameList = () => {
  const { games, loading } = useGameList();

  return (
    <>
      {loading('gameList') && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <ImSpinner2 className="animate-spin h-10 w-10 text-slate-500" />
        </div>
      )}
      <section className="sm:mt-4 md:mt-4">
        <div className="">
          {!loading('gameList') ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3">
              {games.map((game) => (
                <div
                  key={game.id}
                  className="text-center md:rounded-xl my-2 mx-2 bg-slate-500 transition duration-700 ease-in-out hover:bg-sky-500">
                  <h2>{game.gameName}</h2>
                  <p>Player Limit: {game.totalPlayers}</p>
                  <JoinGame gameId={game.id} gameStarted={game.owner} />
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
};

export default GameList;
