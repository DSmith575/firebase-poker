const Button = ({ label, onClick, styles, disabled }) => {
  return (
    <button className={styles} disabled={disabled} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
