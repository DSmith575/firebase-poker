import JoinGame from '../JoinGame';
import { getRandomColor } from '../../../../utils/game/getRandomColor';

const GameCard = ({ game }) => {
  return (
    <section className={`p-6 mb-4 mx-4 sm:mx-6 md:mx-0 ${getRandomColor()} rounded-lg shadow text-center`}>
      <h2 className="h-6 mb-2 text-2xl font-bold tracking-tight text-black">{game.gameName}</h2>
      <p className="mb-3 font-normal">Player Limit: {game.totalPlayers}</p>
      <p className="text-black">
        Lobby: {game.joinedPlayers.length}/{game.totalPlayers}
      </p>
      <JoinGame gameId={game.id} gameStarted={game.owner} playerList={game.joinedPlayers} totalPlayers={game.totalPlayers} />
    </section>
  );
};

export default GameCard;
