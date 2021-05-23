import styles from "./Radio.module.css";

const Radio = (props) => {
  const radioOptions = Object.entries(props.options).map((ele) => {
    return (
      <div className={styles.radioOption}>
        <input
          type="radio"
          onChange={() => {
            props.onChangeHandler(ele[0]);
            props.onTouchHandler(true);
          }}
          id={ele[0]}
          name={props.name}
          value={ele[0]}
        ></input>
        <label htmlFor={ele[0]} className={styles["radio__label"]}>
          {ele[1]}
        </label>
      </div>
    );
  });
  return (
    <fieldset className={styles["radio__field"]}>
      <legend className={styles["radio__legend"]}>
        <h4>{props.title}</h4>
      </legend>
      <div className={styles["radio__group"]}>{radioOptions}</div>
      {!props.valid && <p className={styles.invalid}>Please choose at least one option.</p>}
    </fieldset>
  );
};

export default Radio;
