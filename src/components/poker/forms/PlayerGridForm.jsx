import { createGameForm } from '../../../styles/authForm/authFormStyles';
import Button from '../../button/Button';

const PlayerGridForm = ({ disabled, value, onClick, playerGridLabel }) => {
  return (
    <>
      <div className="flex space-x-2 border p-4 rounded-lg  shadow-lg">
        <h1 className="flex items-center text-2xl">{playerGridLabel}</h1>
        {[2, 3, 4, 5].map((number) => (
          <Button
            type={'button'}
            disabled={disabled}
            key={number}
            value={number}
            onClick={onClick}
            label={number}
            styles={`${createGameForm.button} ${value === number ? createGameForm.isActive : createGameForm.isInactive}`}
          />
        ))}
      </div>
    </>
  );
};

export default PlayerGridForm;
