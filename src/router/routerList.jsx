import HomePage from '../pages/homePage/HomePage';
import Login from '../components/authentication/Login';
import SignOut from '../components/authentication/Signout';
import CreateGamePage from '../pages/createGame/CreateGamePage';

const routes = [
  {
    path: '/',
    label: 'Home',
    element: <HomePage />,
  },
  {
    path: '/creategame',
    label: 'Create Game',
    element: <CreateGamePage />,
  },
  {
    path: '/play',
    label: 'Game List',
    element: 'Game List Page',
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
