import { useState } from "react";

const useInput = (validityChecker) => {
  const [inputValue, setInputValue] = useState("");
  const [inputTouched, setInputTouched] = useState(false);
  const inputValidity = validityChecker(inputValue);
  const inputValid = inputValidity || !inputTouched;
  return {
    inputValue,
    inputTouched,
    inputValidity,
    inputValid,
    setInputValue,
    setInputTouched,
  };
};

export default useInput;
