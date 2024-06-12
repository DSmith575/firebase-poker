import CreateGame from '../../components/poker/session/CreateGame';
import GameList from '../../components/poker/session/gameList/GameList';
import useGameList from '../../hooks/games/useGameList';
import ButtonSpinner from '../../components/spinner/ButtonSpinner';

const GameListPage = () => {
  const { loading } = useGameList();
  return (
    <>
      {loading('gameList') ? (
        <div>
          <ButtonSpinner styles={'animate-spin h-10 w-10 text-black'} />
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

export default GameListPage;
