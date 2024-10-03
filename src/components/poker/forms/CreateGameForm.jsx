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
    <form
      onSubmit={handleCreateSubmit}
      className={
        'relative bg-white px-6 pt-10 flex flex-col sm:w-[500px] items-center border pb-8 ring-1 ring-gray-900/5 mx-4 my-2 md:rounded-lg'
      }>
      <GiCardAceHearts className={'hidden sm:block sm:text-[75px] absolute top-2 left-0'} />
      <InputField
        styles={'border-2 border-gray-300 p-2 rounded-md'}
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
