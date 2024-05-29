import { useState } from 'react';
import useGameList from '../../../hooks/games/useGameList';
import JoinGame from './JoinGame';
import { ImSpinner2 } from 'react-icons/im';
import InputField from '../../input/Input';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import MapGamesList from './MapGamesList';
import GameListCarousel from '../../carousel/GameListCarousel';

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
            Filter created
          </label>
          <InputField inputType={'checkbox'} idLabel={'filter'} onChange={changeFilter} styles={''} />
          {/* <span>Toggle your created games</span> */}
        </div>
        <div className="">
          {loading('gameList') ? (
            <div className="flex items-center justify-center z-50">
              <ImSpinner2 className="animate-spin h-10 w-10 text-black" />
            </div>
          ) : (
            <>
              <GameListCarousel games={games} />
              <MapGamesList games={games} />
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default GameList;
