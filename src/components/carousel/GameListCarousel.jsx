import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectCoverflow, Autoplay } from 'swiper/modules';
import GameCard from '../poker/session/card/GameCard';

import 'swiper/css';
import 'swiper/css/navigation';

const GameListCarousel = ({ games }) => {
  return (
    <section className="hidden md:block md:mx-auto lg:mx-auto xl:mx-24">
      <Swiper
        modules={[EffectCoverflow, Navigation, Autoplay]}
        effect={'coverflow'}
        // autoplay={{
        //   disableOnInterface: false,
        //   delay: 3000,
        //   pauseOnMouseEnter: true,
        // }}
        spaceBetween={30}
        slidesPerView={3}
        navigation={true}
        centeredSlides={false}
        grabCursor={true}
        coverflowEffect={{
          rotate: 0,
          slideShadows: false,
        }}>
        {games.map((game) => (
          <SwiperSlide key={game.id}>
            <GameCard game={game} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default GameListCarousel;
