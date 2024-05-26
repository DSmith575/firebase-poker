const InputField = ({ inputType, value, onChange, placeHolder, styles }) => {
  return <input className={styles} type={inputType} value={value} onChange={onChange} placeholder={placeHolder} />;
};

export default InputField;
