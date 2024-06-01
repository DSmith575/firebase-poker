import HomePage from '../pages/homePage/HomePage';
import LoginPage from '../pages/auth/LoginPage';
import SignOut from '../components/authentication/Signout';
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
    element: <GamePage />,
  },
  {
    path: '/login',
    label: 'Login',
    element: <LoginPage />,
  },
  {
    path: '/signout',
    label: 'Sign out',
    element: <SignOut />,
  },
  {
    path: '/currentGame/:id',
    label: 'Current Game',
    element: '<GamePage />',
  },
];

export default routes;
