import JoinGame from '../JoinGame';
import LeaveGame from '../LeaveGame';
import { useUserAuth } from '../../../../context/FirestoreAuthContext';
import { GiCardRandom } from 'react-icons/gi';
import NavigateLink from '../NavigateLink';

const GameCard = ({ game }) => {
  const { user } = useUserAuth();
  return (
    <section className={`p-6 mb-4 mx-4 sm:mx-6 md:mx-0 bg-[#319b81] rounded-lg shadow text-center`}>
      <GiCardRandom className="w-16 h-16 mx-auto text-white absolute rotate-12 right-5 hover:text-sky-500 hidden lg:block" />
      <h2 className="h-6 mb-2 text-2xl font-bold tracking-tight text-black">{game.gameName}</h2>
      <p className="mb-3 font-normal">Player Limit: {game.totalPlayers}</p>
      <p className="text-black">
        Lobby: {game.joinedPlayers.length}/{game.totalPlayers}
      </p>
      {game.joinedPlayers.includes(user) ? (
        <div className="flex justify-center">
          <NavigateLink navLink={`/games/lobby/${game.id}`} label={'Lobby'} />
          <LeaveGame game={game} player={user} />
        </div>
      ) : (
        <div className="flex justify-center">
          <JoinGame gameId={game.id} playerList={game.joinedPlayers} totalPlayers={game.totalPlayers} />
        </div>
      )}
    </section>
  );
};

export default GameCard;
