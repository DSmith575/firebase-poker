import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectCoverflow, Autoplay } from 'swiper/modules';
import JoinGame from '../poker/session/JoinGame';
import 'swiper/css';
import 'swiper/css/navigation';

const getRandomColor = () => {
  // const colors of every tailwind bg-color-#
  const colors = ['bg-red-400', 'bg-yellow-400', 'bg-green-400', 'bg-purple-400', 'bg-sky-400'];
  return colors[Math.floor(Math.random() * colors.length)];
};

const GameListCarousel = ({ games }) => {
  return (
    <section className="hidden md:block md:mx-auto lg:mx-32">
      <Swiper
        modules={[EffectCoverflow, Navigation, Autoplay]}
        effect={'coverflow'}
        autoplay={{
          disableOnInterface: true,
          delay: 3000,
          pauseOnMouseEnter: true,
        }}
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
          <SwiperSlide key={game.id} className={`p-6 bg-gray-800 ${getRandomColor()} rounded-lg shadow  text-center`}>
            <h2 className="h-6 mb-2 text-2xl font-bold tracking-tight text-black">{game.gameName}</h2>
            <p className="mb-3 font-normal">Player Limit: {game.totalPlayers}</p>
            <JoinGame gameId={game.id} gameStarted={game.owner} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default GameListCarousel;
