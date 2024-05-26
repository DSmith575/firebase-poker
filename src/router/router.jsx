import { createBrowserRouter, Outlet } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ErrorPage from '../pages/errors/ErrorPage';
import routes from './routerList';
import { useUserAuth } from '../context/FirestoreAuthContext';

const AppLayout = () => {
  const { user } = useUserAuth();
  return (
    <>
      <Layout />
      <Outlet />
    </>
  );
};

const routerConfig = [
  {
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: routes.map((route) => ({
      path: route.path,
      element: route.element,
    })),
  },
];

const router = createBrowserRouter(routerConfig);

export default router;
