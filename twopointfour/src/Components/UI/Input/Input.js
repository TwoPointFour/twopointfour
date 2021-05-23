import styles from "./Input.module.css";

const Input = (props) => {
  const invalid = !props.valid ? "invalid" : "";
  const touched = props.touched ? "touched" : "";
  const notEmpty = props.value ? "notEmpty" : "";

  const onInputChange = (event) => {
    props.onChangeHandler(event.target.value);
  };
  const onTouchChange = (event) => {
    props.onTouchHandler(true);
  };
  return (
    <>
      <label className={`${styles.label} ${styles[notEmpty]} ${styles[invalid]} `}>
        <input
          onChange={onInputChange}
          onBlur={onTouchChange}
          className={styles.input}
          value={props.value}
          name={props.name}
          type={props.type}
          pattern={props.pattern}
        ></input>
        <span className={styles.placeholder}>{props.floatText}</span>
        {!props.valid && <p>{`Please fill in the input in the form of ${props.floatText}.`}</p>}
      </label>
    </>
  );
};

export default Input;
