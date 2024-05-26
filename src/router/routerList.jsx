import HomePage from '../pages/homePage/HomePage';
import Login from '../components/authentication/Login';
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
    element: <Login />,
  },
  {
    path: '/signout',
    label: 'Sign out',
    element: <SignOut />,
  },
];

export default routes;
