import routes from '../../../router/routerList';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const MappedRoutes = () => {
  return (
    <ul className="flex gap-4 mt-2 md:flex-row md:gap-2 md:mr-4 md:px-4">
      {routes.map((route, index) => (
        <li
          key={index}
          className="flex md:items-center md:h-8 md:px-10 md:bg-gradient-to-r md:from-sky-500 md:via-slate-500 md:to-gray-900 md:rounded-tl-full md:rounded-br-full md:font-bold md:uppercase md:italic md:text-white hover:opacity-70 md:mr-4">
          <NavLink to={route.path}>{route.label}</NavLink>
        </li>
      ))}
    </ul>
  );
};

export default MappedRoutes;
