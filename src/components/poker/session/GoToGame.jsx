import { NavLink } from 'react-router-dom';

const GoToGame = ({ game, label }) => {
  return (
    <>
      <NavLink
        to={`/games/${game.id}`}
        className={
          'w-[250px] items-center px-3 py-2 text-md font-medium text-center text-white bg-slate-500 rounded-lg hover:bg-sky-600 transition ease-in-and-out duration-700 mr-4'
        }>
        {label}
      </NavLink>
    </>
  );
};

export default GoToGame;
