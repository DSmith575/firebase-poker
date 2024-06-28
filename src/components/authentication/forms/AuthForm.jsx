import Button from '../../button/Button';
import { GiPokerHand } from 'react-icons/gi';

const AuthForm = ({ formLabel, handleSubmit, buttonStyles, buttonType, loadingState, buttonLabel }) => {
  return (
    <div
      className={
        'relative bg-white px-6 pt-10 flex flex-col sm:w-[500px] items-center border pb-8 ring-1 ring-gray-900/5 mx-4 my-2 md:rounded-lg'
      }>
      <GiPokerHand className={'text-[100px] sm:text-[150px] absolute top-0 right-0 rotate-[30deg]'} />
      <h1 className={'text-6xl p-4'}>{formLabel}</h1>
      <form onSubmit={handleSubmit}>
        <Button styles={buttonStyles} type={buttonType} disabled={loadingState} label={buttonLabel} />
      </form>
    </div>
  );
};

export default AuthForm;
