const Button = ({ label, onClick, styles, disabled, value, type }) => {
  return (
    <button type={type} className={styles} value={value} disabled={disabled} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
