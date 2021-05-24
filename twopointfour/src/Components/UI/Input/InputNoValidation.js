import React, { useState } from "react";
import { useImperativeHandle, useRef } from "react";
import styles from "./InputNoValidation.module.css";

const InputNoValidation = React.forwardRef((props, ref) => {
  const inputRef = useRef();
  useImperativeHandle(ref, () => {
    return {
      inputData: inputRef.current,
    };
  });

  const [inputValue, setInputValue] = useState();
  return (
    <label className={`${styles.label} ${inputValue ? styles.filled : ""}`}>
      <input
        onChange={(event) => {
          console.log(event.target.value);
          setInputValue(event.target.value);
        }}
        ref={inputRef}
        className={styles.input}
        name={props.name}
        type={props.type}
        pattern={props.pattern}
      ></input>
      <span className={styles.placeholder}>{props.floatText}</span>
    </label>
  );
});

export default InputNoValidation;
