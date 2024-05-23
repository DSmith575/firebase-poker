import { NavLink } from 'react-router-dom';
import routes from '../../../router/routerList';
const NavBar = () => {
  return (
    <>
      <nav className="h-16 bg-[#e2e2e2] flex justify-center sm:justify-end items-center">
        <ul className="flex flex-row gap-2">
          {routes.map((route, index) => (
            <li key={index} className="border rounded-lg hover:bg-sky-300 p-2">
              <NavLink to={route.path}>{route.label}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
