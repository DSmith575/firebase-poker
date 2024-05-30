import GameCard from '../card/GameCard';

const MobileGamesList = ({ games }) => {
  return (
    <section className="md:hidden">
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </section>
  );
};

export default MobileGamesList;
