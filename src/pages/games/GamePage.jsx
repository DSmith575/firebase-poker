import CreateGame from '../../components/poker/session/CreateGame';
import GameList from '../../components/poker/session/gameList/GameList';
import useGameList from '../../hooks/games/useGameList';
import { ImSpinner2 } from 'react-icons/im';

const GamePage = () => {
  const { loading } = useGameList();
  return (
    <>
      {loading('gameList') ? (
        <div className="flex items-center justify-center z-50">
          <ImSpinner2 className="animate-spin h-10 w-10 text-black" />
        </div>
      ) : (
        <>
          <section className="">
            <CreateGame />
            <h1 className="text-xl font-bold mb-4 text-center ">Game List</h1>
            <GameList />
          </section>
        </>
      )}
    </>
  );
};

export default GamePage;
