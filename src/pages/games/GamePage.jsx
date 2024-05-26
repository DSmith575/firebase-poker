import CreateGame from '../../components/poker/session/CreateGame';
import GameList from '../../components/poker/session/GameList';

const GamePage = () => {
  return (
    <>
      <section className="grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-1 justify-center ">
        <div className="sm:col-span-2 col-start-1 row-span-1 col-span-1">
          <CreateGame />
        </div>
        <div className="sm:row-start-2 sm:col-start-1 sm:col-span-2 gap-4">
          <GameList />
        </div>
      </section>
    </>
  );
};

export default GamePage;
