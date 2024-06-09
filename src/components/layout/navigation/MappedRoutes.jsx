import routes from '../../../router/routerList';
import { NavLink } from 'react-router-dom';
import { useUserAuth } from '../../../context/FirestoreAuthContext';

const MappedRoutes = () => {
  const { user } = useUserAuth();
  // Filter out the route that has the path '/games/:id' so that it isn't showing in the navbar
  let filteredRoutes = routes.filter((route) => route.path !== '/games/:id');
  user
    ? (filteredRoutes = filteredRoutes.filter((route) => route.path !== '/login'))
    : (filteredRoutes = filteredRoutes.filter((route) => route.path !== '/signout' && route.path !== '/games'));
  return (
    <ul className="flex gap-4 mt-2 md:flex-row md:gap-2 md:mr-4 md:px-4">
      {filteredRoutes.map((route, index) => (
        <li
          key={index}
          className="flex ring-3 rounded-lg p-4 md:items-center italic md:h-8 md:px-10 md:bg-gradient-to-r md:from-sky-500 md:via-slate-500 md:to-gray-900 md:rounded-tl-full md:rounded-br-full md:font-bold md:uppercase md:italic md:text-white hover:opacity-70 md:mr-4">
          <NavLink to={route.path}>{route.label}</NavLink>
        </li>
      ))}
    </ul>
  );
};

export default MappedRoutes;
