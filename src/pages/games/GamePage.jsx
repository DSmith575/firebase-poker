import CreateGame from '../../components/poker/session/CreateGame';
import GameList from '../../components/poker/session/GameList';
import useGameList from '../../hooks/games/useGameList';
import { ImSpinner2 } from 'react-icons/im';

const GamePage = () => {
  const { games, loading } = useGameList();

  return (
    <>
      {loading('gameList') ? (
        <div className="h-screen flex items-center justify-center bg-black bg-opacity-50 z-50">
          <ImSpinner2 className="animate-spin h-10 w-10 text-white" />
        </div>
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-1 justify-center">
          <div className="md:col-start-2 row-span-1 col-span-1 sm:col-start-1">
            <CreateGame />
          </div>
          <div className="w-screen sm:row-start-2 sm:col-start-1 md:col-start-3 col-span-1 items-center">
            <header className="text-xl font-bold mb-4 text-center ">Game List</header>
            <div className="mt-4 justify-evenly">
              <GameList />
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default GamePage;
