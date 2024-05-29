const InputField = ({ inputType, value, onChange, placeHolder, styles, min, max, idLabel }) => {
  return (
    <input
      id={idLabel}
      className={styles}
      type={inputType}
      value={value}
      onChange={onChange}
      placeholder={placeHolder}
      minLength={min}
      maxLength={max}
    />
  );
};

export default InputField;
