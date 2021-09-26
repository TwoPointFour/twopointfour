import Icons from "../../Assets/Icons";
import ActionButton from "./ActionButton";
import styles from "./PauseActionButton.module.css";

const PauseActionButton = (props) => {
  return (
    <ActionButton onClickHandler={props.onClickHandler} type={styles.pause}>
      <span className={styles.icon}>{Icons["pause"]}</span> Pause
    </ActionButton>
  );
};

export default PauseActionButton;
