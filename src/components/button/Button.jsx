const Button = ({ label, onClick, styles }) => {
  return (
    <button className={styles} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
