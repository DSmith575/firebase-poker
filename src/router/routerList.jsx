import HomePage from '../pages/homePage/HomePage';
import LoginPage from '../pages/auth/LoginPage';
import SignOut from '../components/authentication/Signout';
import GameLobby from '../components/poker/session/lobby/GameLobby';
import GameLobbyPage from '../pages/games/GameListPage';
import GamePage from '../pages/games/GamePage';

const routes = [
  {
    path: '/',
    label: 'Home',
    element: <HomePage />,
  },
  {
    path: '/games',
    label: 'Games',
    element: <GameLobbyPage />,
  },
  {
    path: '/login',
    label: 'Sign Up / Sign In',
    element: <LoginPage />,
  },
  {
    path: '/games/lobby/:gameId',
    label: 'Game',
    element: <GameLobby />,
  },
  {
    path: '/games/session/:gameId',
    label: 'Poker',
    element: <GamePage />,
  },
  {
    path: '/signout',
    label: 'Sign out',
    element: <SignOut />,
  },
];

export default routes;
