import Button from '../../button/Button';
import { formStyles } from '../../../styles/authForm/authForm';

const AuthForm = ({ formLabel, handleSubmit, buttonStyles, buttonType, loadingState, buttonLabel }) => {
  return (
    <div className={formStyles.formBase}>
      <h1 className={formStyles.formHeader}>{formLabel}</h1>
      <form onSubmit={handleSubmit}>
        <Button styles={buttonStyles} type={buttonType} disabled={loadingState} label={buttonLabel} />
      </form>
    </div>
  );
};

export default AuthForm;
