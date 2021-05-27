import { useState } from "react";
import styles from "./Switch.module.css";

const Switch = (props) => {
  const [checked, setChecked] = useState(props.shareStatus);
  function onClickHandler(event) {
    setChecked((prev) => !prev);
    props.onChangeHandler(event.target.checked);
  }
  return (
    <label htmlFor={props.workoutID} className={styles.toggle}>
      <input
        onChange={onClickHandler}
        id={props.workoutID}
        className={styles["toggle__input"]}
        type="checkbox"
        defaultChecked={checked}
      ></input>
      <div className={styles["toggle__fill"]}></div>
      <div className={styles["toggle__switch"]}></div>
      <span className={styles["toggle__label-on"]}>ON</span>
      <span className={styles["toggle__label-off"]}>OFF</span>
    </label>
  );
};

export default Switch;
