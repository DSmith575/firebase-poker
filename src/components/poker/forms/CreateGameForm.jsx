import { createGameForm, formStyles } from '../../../styles/authForm/authFormStyles';
import { GiCardAceHearts } from 'react-icons/gi';
import InputField from '../../input/Input';
import Button from '../../button/Button';

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
      <GiCardAceHearts className={'hidden sm:block sm:text-[75px] absolute top-2 left-0'} />
      <InputField
        styles={createGameForm.input}
        inputType={inputType}
        placeHolder={placeHolder}
        value={value}
        onChange={onChange}
        min={1}
        max={10}
      />
      {children}
      <Button styles={buttonStyles} type={buttonType} disabled={loadingState} label={buttonLabel} />
    </form>
  );
};

export default CreateGameForm;
