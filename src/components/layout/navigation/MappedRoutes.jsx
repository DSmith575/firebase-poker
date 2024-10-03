import { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { useUserAuth } from '../../../context/FirestoreAuthContext';
import { filterRoutes } from '../../../utils/router/filterRouter';
import routes from '../../../router/routerList';

const MappedRoutes = () => {
  const { user } = useUserAuth();
  // Filtering routes based on user authentication status
  const filteredRoutes = useMemo(() => filterRoutes(routes, user), [routes, user]);
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
