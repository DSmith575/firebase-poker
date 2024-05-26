const InputField = ({ inputType, value, onChange, placeHolder, styles, min, max }) => {
  return (
    <input
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
