import HomePage from '../pages/homePage/HomePage';
import LoginPage from '../pages/auth/LoginPage';
import SignOut from '../components/authentication/Signout';
import GamePage from '../pages/games/GamePage';
import Game from '../components/poker/session/Game';

const routes = [
  {
    path: '/',
    label: 'Home',
    element: <HomePage />,
  },
  {
    path: '/games',
    label: 'Games',
    element: <GamePage />,
  },
  {
    path: '/login',
    label: 'Sign Up / Sign In',
    element: <LoginPage />,
  },
  {
    path: '/games/:id',
    label: 'Game',
    element: <Game />,
  },
  {
    path: '/signout',
    label: 'Sign out',
    element: <SignOut />,
  },
];

export default routes;
