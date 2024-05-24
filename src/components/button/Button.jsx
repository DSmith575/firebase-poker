const Button = ({ text, onClick, className }) => {
  const baseStyles = 'px-4 py-2 bg-green-500 text-white';
  return (
    <button className={baseStyles} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
