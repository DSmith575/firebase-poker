import JoinGame from './JoinGame';
import { getRandomColor } from '../../../utils/carousel/getRandomColor';

const MapGamesList = ({ games }) => {
  if (games.length === 0) {
    return (
      <div className="flex items-center justify-center">
        <h2 className="text-2xl font-bold text-black">No games available</h2>
      </div>
    );
  }
  return games.map((game) => (
    <div
      key={game.id}
      className={`flex flex-col justify-center items-center mx-10 my-4 py-4 md:hidden ${getRandomColor()} border-gray-700 rounded-lg`}>
      <h2 className="mb-2 text-2xl font-bold tracking-tight text-white">{game.gameName}</h2>
      <p className="font-normal">Player Limit: {game.totalPlayers}</p>
      <JoinGame gameId={game.id} gameStarted={game.owner} playerList={game.joinedPlayers} totalPlayers={game.totalPlayers} />
    </div>
  ));
};

export default MapGamesList;
