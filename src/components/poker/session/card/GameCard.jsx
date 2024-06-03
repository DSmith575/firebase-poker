import JoinGame from '../JoinGame';
import LeaveGame from '../LeaveGame';
import { getRandomColor } from '../../../../utils/game/getRandomColor';
import { useUserAuth } from '../../../../context/FirestoreAuthContext';
import { GiCardRandom } from 'react-icons/gi';

const GameCard = ({ game }) => {
  const { user } = useUserAuth();
  return (
    <section className={`p-6 mb-4 mx-4 sm:mx-6 md:mx-0 ${getRandomColor()} rounded-lg shadow text-center`}>
      <GiCardRandom className="w-16 h-16 mx-auto text-white absolute rotate-12 right-5 hover:text-sky-500" />
      <GiCardRandom className="w-16 h-16 mx-auto text-white absolute -rotate-12 left-5 hover:text-sky-500" />
      <h2 className="h-6 mb-2 text-2xl font-bold tracking-tight text-black">{game.gameName}</h2>
      <p className="mb-3 font-normal">Player Limit: {game.totalPlayers}</p>
      <p className="text-black">
        Lobby: {game.joinedPlayers.length}/{game.totalPlayers}
      </p>
      {game.joinedPlayers.includes(user) ? (
        <LeaveGame game={game} player={user} />
      ) : (
        <JoinGame gameId={game.id} gameStarted={game.owner} playerList={game.joinedPlayers} totalPlayers={game.totalPlayers} />
      )}
    </section>
  );
};

export default GameCard;
