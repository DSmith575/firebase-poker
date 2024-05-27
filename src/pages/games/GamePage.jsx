import CreateGame from '../../components/poker/session/CreateGame';
import GameList from '../../components/poker/session/GameList';

const GamePage = () => {
  return (
    <>
      <section className="grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-1 justify-center ">
        <div className="md:col-start-2 row-span-1 col-span-1 sm:col-start-1">
          <CreateGame />
        </div>
        <container className="sm:row-start-2 sm:col-start-1 md:col-start-3 col-span-1 gap-4 items-center">
          <header className="text-xl font-bold mb-4  text-center">Game List</header>
          <div className="h-[32rem] overflow-y-scroll border rounded-lg border-slate-500 flex justify-center pt-4 mr-4">
            <GameList />
          </div>
        </container>
      </section>
    </>
  );
};

export default GamePage;
