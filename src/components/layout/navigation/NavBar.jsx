import { NavLink } from 'react-router-dom';
import { GiCardJoker } from 'react-icons/gi';
import { GrClose } from 'react-icons/gr';
import { GiHamburgerMenu } from 'react-icons/gi';
import MappedRoutes from './MappedRoutes';
import { useState } from 'react';
import Button from '../../button/Button';

const NavBar = () => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <>
      <header className="flex sticky top-0 z-50 flex-col sm:flex-row items-center md:justify-between p-2 border-b-2 bg-gray-100">
        <div>
          <NavLink to={'/'}>
            <GiCardJoker
              aria-label="Home"
              className="text-6xl text-black transition ease-in-out hover:rotate-6 duration-500 -rotate-6 hover:text-sky-500"
            />
          </NavLink>
        </div>
        <nav className="hidden md:flex justify-between items-center gap-4 font-semibold">
          <MappedRoutes />
        </nav>
        <nav className="md:hidden flex flex-col items-end gap-1 font-semibold">
          <Button
            onClick={() => setShowMenu(!showMenu)}
            styles={'md:hidden font-bold text-xl hover:text-gray-500 top-0 right-4 absolute'}
            label={showMenu ? <GrClose className="text-3xl" /> : <GiHamburgerMenu className="text-3xl" />}
          />
          {showMenu && <MappedRoutes />}
        </nav>
      </header>
    </>
  );
};

export default NavBar;
