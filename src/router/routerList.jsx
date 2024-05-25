import HomePage from '../pages/homePage/HomePage';

const routes = [
  {
    path: '/',
    label: 'Home',
    element: <HomePage />,
  },
  {
    path: '/signup',
    label: 'Sign up',
    element: 'Sign up',
  },
  {
    path: '/login',
    label: 'Login',
    element: 'Login',
  },
];

export default routes;
