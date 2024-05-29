import { useState } from 'react';
import useGameList from '../../../hooks/games/useGameList';
import JoinGame from './JoinGame';
import { ImSpinner2 } from 'react-icons/im';
import InputField from '../../input/Input';

const GameList = () => {
  const [filter, setFilter] = useState(false);
  const { games, loading } = useGameList(filter);

  const changeFilter = () => {
    setFilter(!filter);
  };

  return (
    <>
      <section className="sm:mt-4 md:mt-4">
        <div className="flex justify-center">
          <label className="pr-2" htmlFor="filter">
            Filter created
          </label>
          <InputField inputType={'checkbox'} idLabel={'filter'} onChange={changeFilter} styles={''} />
          {/* <span>Toggle your created games</span> */}
        </div>
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
          ) : (
            <>
              <div className="flex items-center justify-center z-50">
                <ImSpinner2 className="animate-spin h-10 w-10 text-black" />
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default GameList;
