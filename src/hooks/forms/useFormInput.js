import { useState } from 'react';

const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  // Only used for the Create game set player limit buttons
  const handleClickPlayerLimit = (event) => {
    setValue(parseInt(event.target.value));
  };

  const reset = () => {
    setValue(initialValue);
  };

  return {
    value,
    onChange: handleChange,
    onClick: handleClickPlayerLimit,
    reset,
  };
};

export default useFormInput;
