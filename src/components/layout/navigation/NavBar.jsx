import { NavLink } from 'react-router-dom';
import { GiCardJoker } from 'react-icons/gi';
import routes from '../../../router/routerList';

const NavBar = () => {
  return (
    <>
      <nav className="h-16 bg-[#e2e2e2] flex justify-between items-center">
        <div>
          <NavLink to={'/'}>
            <GiCardJoker
              aria-label="Home"
              className="text-6xl text-black transition ease-in-out hover:rotate-6 duration-500 -rotate-6 hover:text-sky-500"
            />
          </NavLink>
        </div>
        <>
          <ul className="flex flex-row gap-2">
            {routes.map((route, index) => (
              <li key={index} className="px-4 hover:underline">
                <NavLink to={route.path}>{route.label}</NavLink>
              </li>
            ))}
          </ul>
        </>
      </nav>
    </>
  );
};

export default NavBar;
