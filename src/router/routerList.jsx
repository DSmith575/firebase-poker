import HomePage from '../pages/homePage/HomePage';
import LoginPage from '../pages/auth/LoginPage';
import SignOut from '../components/authentication/Signout';
import GameLobby from '../components/poker/session/lobby/GameLobby';
import GameLobbyPage from '../pages/games/GameListPage';
import GamePage from '../pages/games/GamePage';

import { ROUTE_LABELS } from './routerLabels';
import GameScorePage from '../pages/games/GameScorePage';

const routes = [
  {
    path: '/',
    label: ROUTE_LABELS.HOME,
    element: <HomePage />,
  },
  {
    path: '/games',
    label: ROUTE_LABELS.GAMES,
    element: <GameLobbyPage />,
  },
  {
    path: '/login',
    label: ROUTE_LABELS.LOGIN,
    element: <LoginPage />,
  },
  {
    path: '/games/lobby/:gameId',
    label: ROUTE_LABELS.GAME_LOBBY,
    element: <GameLobby />,
  },
  {
    path: '/games/session/:gameId',
    label: ROUTE_LABELS.POKER,
    element: <GamePage />,
  },
  {
    path: '/games/session/:gameId/gameResults',
    label: ROUTE_LABELS.END_SCREEN,
    element: <GameScorePage />,
  },
  {
    path: '/signout',
    label: ROUTE_LABELS.SIGN_OUT,
    element: <SignOut />,
  },
];

export default routes;
