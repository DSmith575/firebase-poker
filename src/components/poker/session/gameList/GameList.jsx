import { useState } from 'react';
import useGameList from '../../../../hooks/games/useGameList';
import MobileGamesList from './MobileGameList';
import GameListCarousel from '../../../carousel/GameListCarousel';
import ButtonSpinner from '../../../spinner/ButtonSpinner';
import FilterGames from '../filters/FilterGames';

const GameList = () => {
  const [filterCreated, setFilterCreated] = useState(false);
  const [filterJoined, setFilterJoined] = useState(false);
  const { games, loading } = useGameList(filterCreated, filterJoined);

  const changeFilter = () => {
    setFilterJoined(false);
    setFilterCreated(!filterCreated);
  };

  const changeJoined = () => {
    setFilterCreated(false);
    setFilterJoined(!filterJoined);
  };

  return (
    <>
      <section className="sm:mt-4 md:mt-4 h-[100%]">
        <div className="flex justify-center">
          <FilterGames
            label={'Filter Created Games'}
            htmlLabel={'filterCreated'}
            idLabel={'filterCreated'}
            onChange={changeFilter}
          />
          <FilterGames
            label={'Filter Joined Games'}
            htmlLabel={'filterJoined'}
            idLabel={'filterJoined'}
            onChange={changeJoined}
          />
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
