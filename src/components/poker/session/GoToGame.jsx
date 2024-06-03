import { Navigate } from 'react-router-dom';
import Button from '../../button/Button';

const GoToGame = ({ game }) => {
  const handleRedirectGame = async () => {
    <Navigate to={`games/${game.id}`} />;
    console.log(game.id);
  };
  return (
    <>
      <Button
        type={'button'}
        label={'test'}
        styles={
          'inline-flex items-center px-3 py-2 text-md font-medium text-center text-white bg-slate-500 rounded-lg hover:bg-sky-600 transition ease-in-and-out duration-700 '
        }
        onClick={handleRedirectGame}
      />
    </>
  );
};

export default GoToGame;
