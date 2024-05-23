import { createBrowserRouter, Outlet } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import routes from './routerList';

const AppLayout = () => {
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
    errorElement: '',
    children: routes.map((route) => ({
      path: route.path,
      element: route.element,
    })),
  },
];

const router = createBrowserRouter(routerConfig);

export default router;
