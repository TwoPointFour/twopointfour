import { useState } from "react";
import styles from "./RadioTabs.module.css";

const RadioTabs = () => {
  const [clicked, setClicked] = useState(false);
  return (
    <div className={styles["radio__wrapper"]}>
      <div className={styles.radio}>
        <div className={styles["radio__element"]}>
          temp
          <input
            onClick={() => setClicked(false)}
            className={styles["radio__input"]}
            name="radioSelect"
            id="option1"
            type="radio"
          ></input>
          <label className={styles["radio__label"]} htmlFor="option1"></label>
          <label className={styles["radio__text"]}>My Logs</label>
        </div>
        <div className={styles["radio__element"]}>
          temp
          <input
            onClick={() => setClicked(true)}
            className={styles["radio__input"]}
            name="radioSelect"
            id="option2"
            type="radio"
          ></input>
          <label className={styles["radio__label"]} htmlFor="option2"></label>
          <label className={styles["radio__text"]}>Community</label>
        </div>
        <div className={`${styles["radio__slider"]} ${clicked ? styles.clicked : ""}`}></div>
      </div>
    </div>
  );
};

export default RadioTabs;
