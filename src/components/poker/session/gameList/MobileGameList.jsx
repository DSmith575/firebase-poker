import GameCard from '../card/GameCard';

// Component, when viewing on mobile devices,
// Hides the carousel Component
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
