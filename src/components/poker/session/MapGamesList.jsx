import JoinGame from './JoinGame';

const getRandomColor = () => {
  const colors = [
    'bg-red-100',
    'bg-red-200',
    'bg-red-300',
    'bg-red-400',
    'bg-red-500',
    'bg-red-600',
    'bg-yellow-100',
    'bg-yellow-200',
    'bg-yellow-300',
    'bg-yellow-400',
    'bg-yellow-500',
    'bg-yellow-600',
    'bg-green-100',
    'bg-green-200',
    'bg-green-300',
    'bg-green-400',
    'bg-green-500',
    'bg-green-600',
    'bg-blue-100',
    'bg-blue-200',
    'bg-blue-300',
    'bg-purple-100',
    'bg-purple-200',
    'bg-purple-300',
    'bg-purple-400',
    'bg-purple-500',
    'bg-pink-100',
    'bg-pink-200',
    'bg-pink-300',
    'bg-pink-400',
    'bg-pink-500',
    'bg-pink-600',
  ];

  return colors[Math.floor(Math.random() * colors.length)];
};

const MapGamesList = ({ games }) => {
  return games.map((game) => (
    <div
      key={game.id}
      className={`flex flex-col justify-center items-center mx-10 my-4 py-4 md:hidden  ${getRandomColor()} border-gray-700 rounded-lg shadow`}>
      <h2 className="mb-2 text-2xl font-bold tracking-tight text-white">{game.gameName}</h2>
      <p className="font-normal">Player Limit: {game.totalPlayers}</p>
      <JoinGame gameId={game.id} gameStarted={game.owner} />
    </div>
  ));
};

export default MapGamesList;
