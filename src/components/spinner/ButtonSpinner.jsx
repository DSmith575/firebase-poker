import { ImSpinner2 } from 'react-icons/im';

const ButtonSpinner = ({ styles }) => {
  return (
    <>
      <div className="flex items-center justify-center z-50">
        <ImSpinner2 className={styles} />
      </div>
    </>
  );
};

export default ButtonSpinner;
