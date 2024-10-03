import InputField from '../../../input/Input';

const FilterGames = ({ label, htmlLabel, idLabel, onChange }) => {
  return (
    <>
      <label className="pr-2" htmlFor={htmlLabel}>
        {label}
      </label>
      <InputField inputType={'checkbox'} idLabel={idLabel} onChange={onChange} styles={''} />
    </>
  );
};

export default FilterGames;
