import InputField from '../../input/Input';
import Button from '../../button/Button';
import { createGameForm, formStyles } from '../../../styles/authForm/authForm';

const CreateGameForm = ({
  handleCreateSubmit,
  inputType,
  placeHolder,
  value,
  onChange,
  buttonStyles,
  buttonType,
  loadingState,
  buttonLabel,
  children,
}) => {
  return (
    <form onSubmit={handleCreateSubmit} className={formStyles.formBase}>
      <InputField
        styles={createGameForm.input}
        inputType={inputType}
        placeHolder={placeHolder}
        value={value}
        onChange={onChange}
      />
      {children}
      <Button styles={buttonStyles} type={buttonType} disabled={loadingState} label={buttonLabel} />
    </form>
  );
};

export default CreateGameForm;
