import useGameList from '../../../hooks/games/useGameList';
import JoinGame from './JoinGame';

const GameList = () => {
  const { games, loading } = useGameList();

  return (
    <>
      <section className="sm:mt-4 md:mt-4">
        <div className="">
          {loading('gameList') ? (
            <>
              {/* flex justify-center */}
              <div className={'w-screen flex justify-center text-5xl'}>
                <p>Finding games...</p>
              </div>
            </>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3">
              {games.map((game) => (
                <div
                  key={game.id}
                  className="text-center rounded-xl my-2 mx-2 bg-slate-500 transition duration-700 ease-in-out hover:bg-sky-500">
                  {/* <p>Owner: {game.owner}</p> */}
                  <h2>{game.gameName}</h2>
                  <p>Player Limit: {game.totalPlayers}</p>
                  {/* <p>Game Started? {game.started.toString()}</p> */}
                  <JoinGame gameId={game.id} gameStarted={game.owner} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      {/* <section>
      {games.map((game) => (
        <div key={game.id}>
          <h1>{game.gameName}</h1>
          <h2>{game.owner}</h2>
          <h3>{game.totalPlayers}</h3>
          <h4>{game.started.toString()}</h4>
        </div>
      ))}

      </section> */}
    </>
  );
};

export default GameList;
