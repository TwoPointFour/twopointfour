import Icons from "../../Assets/Icons";
import ActionButton from "./ActionButton";
import styles from "./SplitActionButton.module.css";

const SplitActionButton = (props) => {
  return (
    <ActionButton onClickHandler={props.onClickHandler} type={styles.split}>
      <span className={styles.icon}>{Icons["stopwatch"]}</span> Split
    </ActionButton>
  );
};

export default SplitActionButton;
