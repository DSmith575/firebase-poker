import { NavLink } from 'react-router-dom';

const NavigateLink = ({ navLink, label, replace }) => {
  return (
    <>
      <NavLink
        to={navLink}
        replace={replace}
        className={
          'items-center px-3 py-2 text-md font-medium text-center text-white bg-slate-500 rounded-lg hover:bg-sky-600 transition ease-in-and-out duration-700 mr-4'
        }>
        {label}
      </NavLink>
    </>
  );
};

export default NavigateLink;
