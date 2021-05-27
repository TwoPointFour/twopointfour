import styles from "./RadioTabs.module.css";

const RadioTabs = (props) => {
  return (
    <div className={styles["radio__wrapper"]}>
      <div className={styles.radio}>
        <input
          className={styles["radio__input"]}
          name="radioSelect"
          id={props.options[0].name}
          type="radio"
          onChange={() => props.onChangeHandler(props.options[0].name)}
        ></input>
        <label
          className={styles["radio__label"]}
          style={{ gridColumn: "1/1" }}
          htmlFor={props.options[0].name}
        ></label>
        <label style={{ gridColumn: "1/1" }} className={styles["radio__text"]}>
          {props.options[0].title}
        </label>
        <input
          className={styles["radio__input"]}
          style={{ gridColumn: "2/2" }}
          name="radioSelect"
          id={props.options[1].name}
          type="radio"
          onChange={() => props.onChangeHandler(props.options[1].name)}
        ></input>
        <div className={styles["radio__slider"]}></div>
        <label
          style={{ gridColumn: "2/2" }}
          className={styles["radio__label"]}
          htmlFor={props.options[1].name}
        ></label>
        <label style={{ gridColumn: "2/2" }} className={styles["radio__text"]}>
          {props.options[1].title}
        </label>
      </div>
    </div>
  );
};

export default RadioTabs;
