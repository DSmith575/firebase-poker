import Button from '../../button/Button';
import { createGameForm } from '../../../styles/authForm/authForm';

const PlayerGridForm = ({ disabled, value, onClick }) => {
  return (
    <>
      <div className="flex space-x-2">
        {/* <p>Players: </p> */}
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
