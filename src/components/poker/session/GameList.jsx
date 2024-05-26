import useGameList from '../../../hooks/games/useGameList';
import Button from '../../button/Button';

const GameList = () => {
  const { games, loading } = useGameList();

  return (
    <>
      <div className="">
        {loading('gameList') ? (
          <>
            <div className={'w-screen flex justify-center text-5xl'}>
              <p>Finding games...</p>
            </div>
          </>
        ) : (
          <>
            {games.map((game) => (
              <div
                key={game.id}
                className="min-h-[150px] rounded-xl mb-4 mx-2 bg-slate-500 transition duration-700 ease-in-out hover:bg-sky-500">
                <p>Owner: {game.owner}</p>
                <h2>Game Name: {game.gameName}</h2>
                <p>Player Limit: {game.totalPlayers}</p>
                <p>Game Started? {game.started.toString()}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default GameList;
