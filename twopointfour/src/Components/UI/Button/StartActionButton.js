import Icons from "../../Assets/Icons";
import ActionButton from "./ActionButton";
import styles from "./StartActionButton.module.css";

const StartActionButton = (props) => {
  return (
    <ActionButton onClickHandler={props.onClickHandler} type={styles.start}>
      <span className={styles.icon}>{Icons["play"]}</span> {props.text || "Start"}
    </ActionButton>
  );
};

export default StartActionButton;
