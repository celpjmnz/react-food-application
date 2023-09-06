import { useState } from "react";

const useForm = (validateValue) => {
  const [val, setValue] = useState("");
  const [touched, setIfTouched] = useState(false);

  const isValid = validateValue(val);
  const hasError = !isValid && touched;

  const valHandler = (event) => {
    setValue(event.target.value);
  };

  const blurHandler = (event) => {
    setIfTouched(true);
  };

  const resetStates = () => {
    setValue("");
    setIfTouched(false);
  };

  return {
    value: val,
    isValid,
    hasError,
    valHandler,
    blurHandler,
    resetStates,
  };
};

export default useForm;
