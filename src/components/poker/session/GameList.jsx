import useGameList from '../../../hooks/games/useGameList';
import Button from '../../button/Button';
const GameList = () => {
  const { games, loading } = useGameList();

  return (
    <>
      <section className="sm:mt-4 md:mt-4">
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
                  className="max-h-[150px] max-w-[350px] rounded-xl mb-4 mx-2 px-4 bg-slate-500 transition duration-700 ease-in-out hover:bg-sky-500">
                  <p>Owner: {game.owner}</p>
                  <h2>Game Name: {game.gameName}</h2>
                  <p>Player Limit: {game.totalPlayers}</p>
                  <p>Game Started? {game.started.toString()}</p>
                  <Button type={'button'} onClick={() => console.log('Join Game')} label={'Join Game'} />
                </div>
              ))}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default GameList;
