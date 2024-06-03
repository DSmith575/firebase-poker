import { useState } from 'react';
import useGameList from '../../../../hooks/games/useGameList';
import InputField from '../../../input/Input';
import MobileGamesList from './MobileGameList';
import GameListCarousel from '../../../carousel/GameListCarousel';
import ButtonSpinner from '../../../spinner/ButtonSpinner';

const GameList = () => {
  const [filter, setFilter] = useState(false);
  const { games, loading } = useGameList(filter);

  const changeFilter = () => {
    setFilter(!filter);
  };

  return (
    <>
      <section className="sm:mt-4 md:mt-4 h-[100%]">
        <div className="flex justify-center">
          <label className="pr-2" htmlFor="filter">
            Filter Created Games
          </label>
          <InputField inputType={'checkbox'} idLabel={'filter'} onChange={changeFilter} styles={''} />
        </div>
        <div className="">
          {loading('gameList') ? (
            <div className="flex items-center justify-center z-50">
              <ButtonSpinner styles="animate-spin h-10 w-10 text-black" />
            </div>
          ) : (
            <>
              <GameListCarousel games={games} />
              <MobileGamesList games={games} />
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default GameList;
