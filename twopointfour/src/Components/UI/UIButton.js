import Icons from "../Assets/Icons";
import styles from "./UIButton.module.css";

const UIButton = (props) => {
  return (
    <button onClick={props.onClickHandler} className={styles.button}>
      {Icons["comment"]}
      <span> Comment</span>
    </button>
  );
};

export default UIButton;
